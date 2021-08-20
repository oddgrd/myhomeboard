import { isAuth } from '../middleware/isAuth';
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { CreateProblemInput } from '../types/problemTypes';
import { Problem } from '../entities/Problem';
import { Context } from '../types/context';

@Resolver()
export class ProblemResolver {
  // Create new problem
  @Mutation(() => Problem)
  @UseMiddleware(isAuth)
  async createProblem(
    @Arg('options') options: CreateProblemInput,
    @Ctx() { req }: Context
  ): Promise<Problem> {
    const creatorId = req.session.userId;
    const { title, rules, grade, coordinates } = options;
    return Problem.create({
      title,
      rules,
      grade: [grade],
      coordinates,
      creatorId
    }).save();
  }

  // Delete problem by id and creatorId
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProblem(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const problem = await Problem.findOne(id);
    if (!problem) {
      return false;
    }
    if (problem.creatorId !== req.session.userId) {
      throw new Error('not authorized');
    }
    await Problem.delete(id);
    return true;
  }

  // Get all problems
  @Query(() => [Problem], { nullable: true })
  async getProblems(): Promise<Problem[] | null> {
    const problems = await Problem.find();
    if (!problems) return null;
    return problems;
  }

  // Get problem by ID
  @Query(() => Problem, { nullable: true })
  async getProblem(@Arg('id', () => Int) id: number): Promise<Problem | null> {
    const problem = await Problem.findOne(id);
    if (!problem) {
      return null;
    }
    return problem;
  }
}
