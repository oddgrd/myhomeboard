import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';
import { Context } from '../../types/context';
import { Board } from '../../entities/Board';
import { BoardInput, BoardResponse, EditBoardInput } from './types';
import { Layout } from '../../entities/Layout';
import { getConnection } from 'typeorm';
import { WhitelistedUser } from '../user/types';

@Resolver(Board)
export class BoardResolver {
  // Create new Board
  @Mutation(() => BoardResponse)
  @UseMiddleware(isAuth)
  async createBoard(
    @Arg('options') options: BoardInput,
    @Ctx() { req }: Context
  ): Promise<BoardResponse> {
    const creatorId = req.session.passport?.user;
    const { title, description, adjustable, angles, city, country } = options;
    let board;
    try {
      board = await Board.create({
        title,
        description,
        adjustable,
        angles,
        creatorId,
        city,
        country,
      }).save();
    } catch (error) {
      // Catch duplicate title error
      if (error.code === '23505') {
        return {
          errors: [
            {
              field: 'title',
              message: 'Title has to be unique',
            },
          ],
        };
      }
    }
    // Whitelist creator after creating board
    await getConnection().query(
      `
      UPDATE "user" 
      SET "boardWhitelist" = array_append("boardWhitelist", $1) 
      WHERE id = $2;
    `,
      [board?.id, creatorId]
    );
    return { board };
  }

  // Edit Board
  @Mutation(() => BoardResponse)
  @UseMiddleware(isAuth)
  async editBoard(
    @Arg('options') options: EditBoardInput,
    @Ctx() { req }: Context
  ) {
    const creatorId = req.session.passport?.user;
    const { title, description, adjustable, angles, boardId, city, country } =
      options;
    let board;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Board)
        .set({ title, angles, adjustable, description, city, country })
        .where('id = :id and "creatorId" = :creatorId', {
          id: boardId,
          creatorId,
        })
        .returning('*')
        .execute();
      board = result.raw[0];
    } catch (error) {
      if (error.code === '23505') {
        return {
          errors: [
            {
              field: 'title',
              message: 'Title has to be unique',
            },
          ],
        };
      }
    }

    return { board };
  }

  // Get current layout
  @FieldResolver(() => Layout, { nullable: true })
  currentLayout(@Root() board: Board) {
    if (!board.layouts) return null;
    return board.layouts[board.layouts.length - 1];
  }

  // Get Board by ID
  @Query(() => Board)
  async getBoard(@Arg('boardId') boardId: string) {
    return Board.findOne({ where: { id: boardId }, relations: ['layouts'] });
  }

  // Get all Boards
  @Query(() => [Board])
  async getBoards() {
    return Board.find({ order: { createdAt: 'ASC' }, relations: ['layouts'] });
  }

  // Delete board
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteBoard(
    @Arg('boardId') boardId: string,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    try {
      await getConnection().transaction(async (em) => {
        await em.query(
          `
            DELETE FROM problem
            WHERE "boardId" = $1;
          `,
          [boardId]
        );
        await em.query(
          `
            DELETE FROM layout
            WHERE "boardId" = $1;
          `,
          [boardId]
        );
        const result = await em.query(
          `
            DELETE FROM board
            WHERE id = $1 AND "creatorId" = $2
            RETURNING *;
          `,
          [boardId, req.session.passport?.user]
        );
        if (result[1] === 0)
          throw new Error('Problem not found or current user is not creator');
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  // Get whitelisted users for board
  @Query(() => [WhitelistedUser])
  @UseMiddleware(isAuth)
  async getWhitelist(@Arg('boardId') boardId: string) {
    const whitelistedUsers = await getConnection().query(
      `
      SELECT name, email
      FROM "user"
      WHERE $1 = ANY ("boardWhitelist");
    `,
      [boardId]
    );
    return whitelistedUsers;
  }
}
