import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LayoutInput {
  @Field(() => GraphQLUpload)
  file: FileUpload;

  @Field()
  title: string;

  @Field()
  boardId: string;

  @Field()
  description: string;
}

@InputType()
export class DeleteLayoutInput {
  @Field()
  layoutId: string;

  @Field()
  publicId: string;
}
