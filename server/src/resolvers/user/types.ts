import { ObjectType, Field, InputType } from 'type-graphql';
import { FieldError } from '../problem/types';

@InputType()
export class WhitelistInput {
  @Field()
  email: string;

  @Field()
  boardId: string;
}

@ObjectType()
export class WhitelistResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => String, { nullable: true })
  userId?: string;
}
