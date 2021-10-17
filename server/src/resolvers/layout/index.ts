import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';
import { Context } from 'src/types/context';
import { uploadImage } from '../../utils/uploadImage';
import { Layout } from '../../entities/Layout';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { getConnection } from 'typeorm';

@Resolver(Layout)
export class LayoutResolver {
  // Create new Layout
  // PRIVATE
  @Mutation(() => Layout)
  @UseMiddleware(isAuth)
  async createLayout(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Arg('title') title: string,
    @Arg('boardId') boardId: string,
    @Arg('description') description: string,
    @Ctx() { req }: Context
  ): Promise<Layout> {
    const creatorId = req.session.passport?.user;
    const result = await uploadImage(file);
    const layout = await Layout.create({
      title,
      boardId,
      description,
      creatorId,
      url: result.eager[0].secure_url
    }).save();
    return layout;
  }

  // Delete layout
  // PRIVATE
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteLayout(
    @Arg('layoutId') layoutId: string,
    @Arg('layoutUrl') layoutUrl: string,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    try {
      await getConnection().transaction(async (em) => {
        await em.query(
          `
            DELETE FROM problem
            WHERE "layoutUrl" = $1;
          `,
          [layoutUrl]
        );
        const result = await em.query(
          `
            DELETE FROM layout
            WHERE id = $1 AND "creatorId" = $2
            RETURNING *;
          `,
          [layoutId, req.session.passport?.user]
        );

        if (result[1] === 0)
          throw new Error('Layout not found or current user is not creator');
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
  // Get all layouts by boardId
  // PUBLIC
  @Query(() => [Layout])
  async getBoardLayouts(@Arg('boardId') boardId: string) {
    return Layout.find({ where: { boardId }, order: { createdAt: 'DESC' } });
  }
}