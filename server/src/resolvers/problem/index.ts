import { isAuth } from '../../middleware/isAuth';
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import {
  CreateProblemInput,
  PaginatedProblems,
  EditProblemInput,
  ProblemResponse,
} from './types';
import { Problem } from '../../entities/Problem';
import { Context } from '../../types/context';
import { getConnection } from 'typeorm';
import { User } from '../../entities/User';
import { Layout } from '../../entities/Layout';

@Resolver(Problem)
export class ProblemResolver {
  // Field resolver for creator field
  @FieldResolver(() => User)
  creator(@Root() problem: Problem, @Ctx() { userLoader }: Context) {
    return userLoader.load(problem.creatorId);
  }

  // Field resolver for layout field
  @FieldResolver(() => Layout)
  layout(@Root() problem: Problem, @Ctx() { layoutLoader }: Context) {
    return layoutLoader.load(problem.layoutId);
  }

  // Field resolver for consensusGrade
  @FieldResolver(() => Int, { nullable: true })
  consensusGrade(@Root() problem: Problem) {
    if (!problem.ascents || problem.ascents.length === 0) return null;
    const sumGrades = problem.ascents
      .map((ascent) => ascent.grade)
      .reduce((val: number, acc: number) => acc + val);
    return Math.round(sumGrades / problem.ascents.length);
  }

  // Field resolver for consensusRating
  @FieldResolver(() => Int, { nullable: true })
  consensusRating(@Root() problem: Problem) {
    if (!problem.ascents || problem.ascents.length === 0) return null;
    const sumRatings = problem.ascents
      .map((ascent) => ascent.rating)
      .reduce((val: number, acc: number) => acc + val);
    return Math.round(sumRatings / problem.ascents.length);
  }

  // Field resolver for sendStatus
  @FieldResolver(() => Boolean, { nullable: true })
  sendStatus(@Root() problem: Problem, @Ctx() { req }: Context) {
    if (!problem.ascents || problem.ascents.length === 0) return false;
    const userId = req.session.passport?.user;
    const hasSent = problem.ascents.filter(
      (ascent) => ascent.userId === userId
    );
    if (hasSent.length === 0) return false;
    return true;
  }

  // Create new problem
  @Mutation(() => ProblemResponse)
  @UseMiddleware(isAuth)
  async createProblem(
    @Arg('options') options: CreateProblemInput,
    @Ctx() { req }: Context
  ): Promise<ProblemResponse> {
    const creatorId = req.session.passport?.user;
    const { title, rules, grade, coordinates, boardId, layoutId, angle } =
      options;
    let problem;
    try {
      const result = await getConnection().query(
        `
          INSERT INTO problem (title, rules, grade, coordinates, "creatorId", "boardId", "layoutId", angle)
          VALUES ($1, $2, $3, $4::jsonb[], $5, $6, $7, $8)
          RETURNING *;
        `,
        [title, rules, grade, coordinates, creatorId, boardId, layoutId, angle]
      );
      problem = result[0];
    } catch (error) {
      // Catch duplicate title error. UNIQUE(title, boardId)
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
    return { problem };
  }

  // Update problem info
  @Mutation(() => ProblemResponse)
  @UseMiddleware(isAuth)
  async editProblem(
    @Arg('options') options: EditProblemInput,
    @Ctx() { req }: Context
  ): Promise<ProblemResponse> {
    const { title, rules, grade, problemId, angle } = options;
    let problem;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Problem)
        .set({ title, rules, grade, angle })
        .where('id = :id and "creatorId" = :creatorId', {
          id: problemId,
          creatorId: req.session.passport?.user,
        })
        .returning('*')
        .execute();
      problem = result.raw[0];
    } catch (error) {
      // Catch duplicate title error. UNIQUE(title, boardId)
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

    return { problem };
  }

  // Delete problem by id and creatorId
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProblem(
    @Arg('id') id: string,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const creatorId = req.session.passport?.user;
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Problem)
      .where('"creatorId" = :creatorId', { creatorId })
      .andWhere('id = :id', {
        id,
      })
      .execute();

    if (result.affected === 0) return false;

    return true;
  }

  // Get all problems with cursor pagination
  @Query(() => PaginatedProblems)
  async getProblems(
    @Arg('boardId') boardId: string,
    @Arg('limit', () => Int!) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedProblems> {
    // If there are more posts left than limit, set hasMore boolean to true
    const realLimit = Math.min(50, limit); // max limit 50
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .createQueryBuilder(Problem, 'problem')
      .leftJoinAndSelect('problem.ascents', 'ascent')
      .where('problem.boardId = :boardId', { boardId })
      .orderBy('problem.createdAt', 'DESC');

    if (cursor) {
      qb.where('problem."createdAt" < :cursor', {
        cursor: new Date(+cursor),
      });
    }
    qb.take(realLimitPlusOne);
    const problems = await qb.getMany();
    return {
      problems: problems.slice(0, realLimit),
      hasMore: problems.length === realLimitPlusOne,
    };
  }

  // Get problem by ID
  @Query(() => Problem, { nullable: true })
  async getProblem(@Arg('id') id: string): Promise<Problem | null> {
    const problem = await getConnection()
      .createQueryBuilder(Problem, 'problem')
      .leftJoinAndSelect('problem.ascents', 'ascent')
      .orderBy('ascent.createdAt', 'ASC')
      .leftJoinAndSelect('ascent.user', 'user')
      .where('problem.id = :id', { id })
      .getOne();

    if (!problem) {
      return null;
    }
    return problem;
  }
}
