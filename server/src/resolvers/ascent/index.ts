import { Ascent } from '../../entities/Ascent';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { Context } from '../../types/context';
import { isAuth } from '../../middleware/isAuth';
import { AddAscentInput, EditAscentInput } from './types';
import { getConnection } from 'typeorm';

@Resolver(Ascent)
export class AscentResolver {
  // Add ascent
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addAscent(
    @Arg('options') options: AddAscentInput,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    const userId = req.session.passport?.user;
    const { rating, grade, attempts, comment, problemId, boardId } = options;

    try {
      await getConnection().query(
        `
          INSERT INTO ascent ("userId", "problemId", grade, attempts, rating, comment, "boardId")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [userId, problemId, grade, attempts, rating, comment, boardId]
      );
    } catch (error) {
      // Catch duplicate ascent error (not possible in client)
      console.log('message: ', error.message);
      return false;
    }

    return true;
  }

  // Edit ascent
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async editAscent(
    @Arg('options') options: EditAscentInput,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    const userId = req.session.passport?.user;
    const { rating, grade, attempts, comment, problemId } = options;

    const result = await getConnection()
      .createQueryBuilder()
      .update(Ascent)
      .set({ rating, grade, attempts, comment })
      .where('"problemId" = :id and "userId" = :userId', {
        id: problemId,
        userId
      })
      .execute();
    if (result.affected === 0) return false;
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
