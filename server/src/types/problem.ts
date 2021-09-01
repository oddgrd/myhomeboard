import { Problem } from '../entities/Problem';
import { InputType, Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Coordinates {
  @Field(() => Int)
  x: number;

  @Field(() => Int)
  y: number;

  @Field()
  color: string;
}

// ObjectType cant be used as input
@InputType()
export class CoordinatesInput {
  @Field(() => Int)
  x: number;

  @Field(() => Int)
  y: number;

  @Field()
  color: string;
}

@InputType()
export class CreateProblemInput {
  @Field()
  title: string;

  @Field()
  rules: string;

  @Field(() => Int)
  grade: number;

  @Field(() => [CoordinatesInput])
  coordinates: CoordinatesInput[];
}

@InputType()
export class AddAscentInput {
  @Field()
  problemId!: string;

  @Field(() => Int)
  grade!: number;

  @Field(() => Int)
  rating!: number;

  @Field(() => Int)
  attempts!: number;

  @Field({ nullable: true })
  comment: string;
}

@ObjectType()
export class PaginatedProblems {
  @Field(() => [Problem])
  problems: Problem[];

  @Field()
  hasMore: boolean;
}
