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
import { BoardLayout } from '../entities/BoardLayout';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class BoardLayoutResolver {
  @Query(() => String)
  hello() {
    return 'Hello World';
  }

  @Mutation(() => BoardLayout)
  @UseMiddleware(isAuth)
  async createBoardLayout(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() { req }: Context
  ): Promise<BoardLayout> {
    const creatorId = req.session.passport?.user;
    const result = await uploadImage(file);
    console.log(result);
    const board = await BoardLayout.create({
      title,
      description,
      creatorId,
      url: result.secure_url
    }).save();
    return board;
  }
}
