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
  PaginatedProblems,
  UpdateProblemInput
} from '../types/problem';
import { Problem } from '../entities/Problem';
import { Context } from '../types/context';
import { Ascent } from '../entities/Ascent';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

@Resolver(Problem)
export class ProblemResolver {
  // Field resolver for creator field
  @FieldResolver(() => User)
  creator(@Root() problem: Problem, @Ctx() { userLoader }: Context) {
    return userLoader.load(problem.creatorId);
  }

  // Field resolver for consensusGrade
  @FieldResolver(() => Int!, { nullable: true })
  consensusGrade(@Root() problem: Problem) {
    if (!problem.ascents || problem.ascents.length === 0) return null;
    const suggestedGrades = problem.ascents.map((ascent) => ascent.grade);
    const averageGrade = suggestedGrades.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageGrade / suggestedGrades.length);
  }

  // Field resolver for consensusRating
  @FieldResolver(() => Int!, { nullable: true })
  consensusRating(@Root() problem: Problem) {
    if (!problem.ascents || problem.ascents.length === 0) return null;
    const suggestedRatings = problem.ascents.map((ascent) => ascent.rating);
    const averageRating = suggestedRatings.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageRating / suggestedRatings.length);
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

  // Update problem info
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateProblem(
    @Arg('options') options: UpdateProblemInput,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const { title, rules, grade, problemId } = options;

    const result = await getConnection()
      .createQueryBuilder()
      .update(Problem)
      .set({ title, rules, grade })
      .where('id = :id and "creatorId" = :creatorId', {
        id: problemId,
        creatorId: req.session.passport?.user
      })
      .execute();

    if (!result) return false;
    return true;
  }

  // Delete problem by id and creatorId
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProblem(
    @Arg('id') id: string,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Problem)
      .where('id = :id', { id })
      .andWhere('"creatorId" = :currentUser', {
        currentUser: req.session.passport?.user
      })
      .execute();

    if (result.affected === 0) return false;

    return true;
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

    const qb = getConnection()
      .createQueryBuilder(Problem, 'problem')
      .leftJoinAndSelect('problem.ascents', 'ascent')
      .orderBy('problem.createdAt', 'DESC');

    if (cursor) {
      qb.where('problem."createdAt" < :cursor', {
        cursor: new Date(+cursor)
      });
    }
    qb.take(realLimitPlusOne);
    const problems = await qb.getMany();
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

  // Add ascent
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addAscent(
    @Arg('options') options: AddAscentInput,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    const userId = req.session.passport?.user;
    const { rating, grade, attempts, comment, problemId } = options;

    try {
      await getConnection().query(
        `
          INSERT INTO ascent ("userId", "problemId", grade, attempts, rating, comment)
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [userId, problemId, grade, attempts, rating, comment]
      );
    } catch (error) {
      // Catch duplicate ascent error
      console.log('message: ', error.message);
      return false;
    }

    return true;
  }

  // Delete ascent by id and creatorId
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAscent(
    @Arg('problemId') problemId: string,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const userId = req.session.passport?.user;
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Ascent)
      .where('"userId" = :userId', { userId })
      .andWhere('"problemId" = :problemId', {
        problemId
      })
      .execute();

    if (result.affected === 0) return false;

    return true;
  }

  @Query(() => [Ascent], { nullable: true })
  async getAscents() {
    const ascents = await Ascent.find({ relations: ['user', 'problem'] });
    if (!ascents) return null;
    return ascents;
  }
}
