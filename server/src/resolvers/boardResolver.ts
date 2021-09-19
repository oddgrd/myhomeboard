import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { Context } from 'src/types/context';
import { Board } from '../entities/Board';
import { BoardInput } from '../types/board';
import { Layout } from '../entities/Layout';
import { getConnection } from 'typeorm';

@Resolver(Board)
export class BoardResolver {
  // Create new Board
  // PRIVATE
  @Mutation(() => Board)
  @UseMiddleware(isAuth)
  async createBoard(
    @Arg('options') options: BoardInput,
    @Ctx() { req }: Context
  ): Promise<Board> {
    const creatorId = req.session.passport?.user;
    const { title, description, adjustable, angles, location, slug } = options;
    const board = await Board.create({
      title,
      slug,
      description,
      adjustable,
      angles,
      location,
      creatorId
    }).save();

    return board;
  }

  // Get current layout
  // PUBLIC
  @FieldResolver(() => Layout, { nullable: true })
  currentLayout(@Root() board: Board) {
    if (!board.layouts) return null;
    return board.layouts[board.layouts.length - 1];
  }

  // Get Board by ID
  // PUBLIC
  @Query(() => Board)
  async getBoard(@Arg('slug') slug: string) {
    return Board.findOne({ where: { slug }, relations: ['layouts'] });
  }

  // Get all Boards
  // PUBLIC
  @Query(() => [Board])
  async getBoards() {
    return Board.find({ order: { createdAt: 'ASC' }, relations: ['layouts'] });
  }

  // Delete board
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteBoard(
    @Arg('slug') slug: string,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    try {
      await getConnection().transaction(async (em) => {
        await em.query(
          `
            DELETE FROM ascent
            WHERE "boardSlug" = $1;
          `,
          [slug]
        );
        await em.query(
          `
            DELETE FROM problem
            WHERE "boardSlug" = $1;
          `,
          [slug]
        );
        await em.query(
          `
            DELETE FROM layout
            WHERE "boardSlug" = $1;
          `,
          [slug]
        );
        const board = await em.query(
          `
            DELETE FROM board
            WHERE slug = $1 AND "creatorId" = $2
            RETURNING *;
          `,
          [slug, req.session.passport?.user]
        );
        if (board[1] === 0)
          throw new Error('Problem not found or current user is not creator');
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
