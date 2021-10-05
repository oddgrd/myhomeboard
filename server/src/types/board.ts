import { Board } from '../entities/Board';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { FieldError } from './problem';

@InputType()
export class BoardInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  adjustable: boolean;

  @Field(() => [Int])
  angles: number[];

  @Field()
  city: string;

  @Field()
  country: string;
}

@InputType()
export class EditBoardInput extends BoardInput {
  @Field()
  boardId: string;
}

@ObjectType()
export class BoardResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Board, { nullable: true })
  board?: Board;
}
