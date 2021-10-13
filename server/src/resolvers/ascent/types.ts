import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class AddAscentInput {
  @Field()
  problemId!: string;

  @Field()
  boardId!: string;

  @Field(() => Int)
  grade!: number;

  @Field(() => Int)
  rating!: number;

  @Field(() => Int)
  attempts!: number;

  @Field()
  comment!: string;
}

@InputType()
export class EditAscentInput {
  @Field()
  problemId!: string;

  @Field(() => Int)
  grade!: number;

  @Field(() => Int)
  rating!: number;

  @Field(() => Int)
  attempts!: number;

  @Field()
  comment!: string;
}
