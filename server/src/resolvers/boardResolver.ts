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
}
