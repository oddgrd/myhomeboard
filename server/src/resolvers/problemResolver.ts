import { isAuth } from '../middleware/isAuth';
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql';
import {
  AddAscentInput,
  CreateProblemInput,
  PaginatedProblems
} from '../types/problemTypes';
import { Problem } from '../entities/Problem';
import { Context } from '../types/context';
import { Ascent } from '../entities/Ascent';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

@Resolver(Problem)
export class ProblemResolver {
  // Create new problem
  @Mutation(() => Problem)
  @UseMiddleware(isAuth)
  async createProblem(
    @Arg('options') options: CreateProblemInput,
    @Ctx() { req }: Context
  ): Promise<Problem> {
    const creatorId = req.session.passport?.user;
    const { title, rules, grade, coordinates } = options;
    return Problem.create({
      title,
      rules,
      grade,
      coordinates,
      creatorId
    }).save();
  }

  // Create ascent and add to problem
  @Mutation(() => Problem, { nullable: true })
  @UseMiddleware(isAuth)
  async addAscent(
    @Arg('options') options: AddAscentInput,
    @Ctx() { req }: Context
  ): Promise<Problem | null> {
    const userId = req.session.passport?.user;
    const { rating, grade, attempts, comment, problemId } = options;

    const problem = await Problem.findOne(problemId);

    if (!problem) {
      return null;
    }
    const alreadyAscended = await Ascent.findOne({
      where: { problemId, userId }
    });
    if (alreadyAscended) {
      return null;
    }

    await await getConnection().query(
      `
        INSERT INTO ascent ("userId", "problemId", grade, attempts, rating, comment)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [userId, problemId, grade, attempts, rating, comment]
    );

    return problem;
  }

  @Query(() => [Ascent], { nullable: true })
  async getAscents() {
    const ascents = await Ascent.find({ relations: ['user', 'problem'] });
    if (!ascents) return null;
    return ascents;
  }

  // Delete problem by id and creatorId
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProblem(
    @Arg('id') id: string,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const problem = await Problem.findOne(id);
    if (!problem) {
      return false;
    }
    if (problem.creatorId !== req.session.passport?.user) {
      throw new Error('not authorized');
    }
    await Problem.delete(id);
    return true;
  }

  // Field resolver for creator field on Problem
  @FieldResolver(() => User)
  creator(@Root() problem: Problem, @Ctx() { userLoader }: Context) {
    return userLoader.load(problem.creatorId);
  }

  // Get all problems with cursor pagination
  @Query(() => PaginatedProblems)
  async getProblems(
    @Arg('limit', () => Int!) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedProblems> {
    // If there are more posts left than limit, set hasMore boolean to true
    const realLimit = Math.min(50, limit); // max limit 50
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }
    const problems = await getConnection().query(
      `
      SELECT p.*
      FROM problem p
      ${cursor ? `WHERE p."createdAt" < $2` : ''}
      ORDER BY p."createdAt" DESC
      LIMIT $1
    `,
      replacements
    );

    return {
      problems: problems.slice(0, realLimit),
      hasMore: problems.length === realLimitPlusOne
    };
  }

  // Get problem by ID
  @Query(() => Problem, { nullable: true })
  async getProblem(@Arg('id') id: string): Promise<Problem | null> {
    const problem = await getConnection()
      .createQueryBuilder(Problem, 'problem')
      .leftJoinAndSelect('problem.ascents', 'ascent')
      .leftJoinAndSelect('ascent.user', 'u user')
      .leftJoinAndSelect('problem.creator', 'user')
      .where('problem.id = :id', { id })
      .getOne();

    if (!problem) {
      return null;
    }
    return problem;
  }
}
