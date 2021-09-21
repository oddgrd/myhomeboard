import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { Context } from 'src/types/context';
import { uploadImage } from '../utils/uploadImage';
import { Layout } from '../entities/Layout';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(Layout)
export class LayoutResolver {
  // Create new Layout
  // PRIVATE
  @Mutation(() => Layout)
  @UseMiddleware(isAuth)
  async createLayout(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Arg('title') title: string,
    @Arg('boardSlug') boardSlug: string,
    @Arg('description') description: string,
    @Ctx() { req }: Context
  ): Promise<Layout> {
    const creatorId = req.session.passport?.user;
    const result = await uploadImage(file);
    const layout = await Layout.create({
      title,
      boardSlug,
      description,
      creatorId,
      url: result.eager[0].secure_url
    }).save();
    return layout;
  }

  // Get all Layouts
  // PUBLIC
  @Query(() => [Layout])
  async getLayouts() {
    return Layout.find();
  }
}
