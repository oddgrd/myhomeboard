import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import Cloudinary from 'cloudinary';
import { isAuth } from '../../middleware/isAuth';
import { Context } from 'src/types/context';
import { uploadImage } from '../../utils/uploadImage';
import { Layout } from '../../entities/Layout';
import { getConnection } from 'typeorm';
import { DeleteLayoutInput, LayoutInput } from './types';

@Resolver(Layout)
export class LayoutResolver {
  // Create new Layout
  // PRIVATE
  @Mutation(() => Layout)
  @UseMiddleware(isAuth)
  async createLayout(
    @Arg('options') options: LayoutInput,
    @Ctx() { req }: Context
  ): Promise<Layout> {
    const { title, description, boardId, file } = options;
    const creatorId = req.session.passport?.user;
    const result = await uploadImage(file);
    const layout = await Layout.create({
      title,
      boardId,
      description,
      creatorId,
      url: result.eager[0].secure_url,
      publicId: result.public_id,
    }).save();
    return layout;
  }

  // Delete layout
  // PRIVATE
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteLayout(
    @Arg('options') options: DeleteLayoutInput,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const { layoutId, publicId } = options;
    try {
      await getConnection().transaction(async (em) => {
        await em.query(
          `
            DELETE FROM problem
            WHERE "layoutId" = $1;
          `,
          [layoutId]
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

        await Cloudinary.v2.uploader.destroy(publicId, (error, result) => {
          console.log(result, error);
          if (error) throw new Error(error);
        });
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
