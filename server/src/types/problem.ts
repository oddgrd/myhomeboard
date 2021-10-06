import { Problem } from '../entities/Problem';
import {
  InputType,
  Field,
  Int,
  ObjectType,
  registerEnumType
} from 'type-graphql';

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
  boardId: string;

  @Field()
  layoutUrl: string;

  @Field()
  title: string;

  @Field()
  rules: string;

  @Field(() => Int)
  grade: number;

  @Field(() => Int)
  angle: number;

  @Field(() => [CoordinatesInput])
  coordinates: CoordinatesInput[];
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class ProblemResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Problem, { nullable: true })
  problem?: Problem;
}

@InputType()
export class EditProblemInput {
  @Field()
  problemId: string;

  @Field()
  title: string;

  @Field()
  rules: string;

  @Field(() => Int)
  grade: number;

  @Field(() => Int)
  angle: number;
}

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

@ObjectType()
export class PaginatedProblems {
  @Field(() => [Problem])
  problems: Problem[];

  @Field()
  hasMore: boolean;
}
