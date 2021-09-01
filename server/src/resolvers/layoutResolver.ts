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

@Resolver()
export class LayoutResolver {
  @Query(() => String)
  hello() {
    return 'Hello World';
  }

  @Mutation(() => Layout)
  @UseMiddleware(isAuth)
  async createLayout(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() { req }: Context
  ): Promise<Layout> {
    const creatorId = req.session.passport?.user;
    const result = await uploadImage(file);
    const board = await Layout.create({
      title,
      description,
      creatorId,
      url: result.secure_url
    }).save();
    return board;
  }
}
