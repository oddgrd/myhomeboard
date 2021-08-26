import { isAuth } from '../middleware/isAuth';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { AddAscentInput, CreateProblemInput } from '../types/problemTypes';
import { Problem } from '../entities/Problem';
import { Context } from '../types/context';
import { Ascent } from '../entities/Ascent';
import { getConnection } from 'typeorm';

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
      grade: [grade],
      coordinates,
      creatorId
    }).save();
  }

  // Create ascent and add to problem
  @Mutation(() => Ascent, { nullable: true })
  @UseMiddleware(isAuth)
  async addAscent(
    @Arg('options') options: AddAscentInput,
    @Ctx() { req }: Context
  ): Promise<Ascent | null> {
    const userId = req.session.passport?.user;
    const { rating, grade, attempts, comment, problemId } = options;

    const problem = await Problem.findOne(problemId);

    if (!problem) {
      return null;
    }

    const oldAscent = await Ascent.findOne({ where: { problemId, userId } });
    if (oldAscent) {
      return null;
    }
    const ascent = await Ascent.create({
      userId,
      problemId,
      grade,
      attempts,
      rating,
      comment
    }).save();

    return ascent;
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

  // Get all problems
  @Query(() => [Problem], { nullable: true })
  async getProblems(): Promise<Problem[] | null> {
    const problems = await Problem.find({ relations: ['ascents', 'creator'] });
    if (!problems) return null;
    return problems;
  }

  // Get problem by ID
  @Query(() => Problem, { nullable: true })
  async getProblem(@Arg('id') id: string): Promise<Problem | null> {
    // const problem = await Problem.findOne({
    //   where: { id: id },
    //   relations: ['creator', 'ascents']
    // });
    const problem = await getConnection()
      .createQueryBuilder(Problem, 'problem')
      .leftJoinAndSelect('problem.ascents', 'ascent')
      .where('problem.id = :id', { id })
      .getOne();

    if (!problem) {
      return null;
    }
    return problem;
  }
}
