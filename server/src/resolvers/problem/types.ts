import { Problem } from '../../entities/Problem';
import { InputType, Field, Int, ObjectType } from 'type-graphql';
import { User } from '../../entities/User';

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
  layoutId: string;

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

@ObjectType()
export class ProblemItem {
  @Field()
  id!: string;

  @Field()
  creatorId!: string;

  @Field()
  title!: string;

  @Field(() => Int)
  angle!: number;

  @Field(() => Int)
  grade!: number;

  @Field(() => User)
  creator: User;

  @Field()
  boardId!: string;

  @Field(() => [String])
  ascentIds: String[];

  @Field(() => Int, {nullable: true})
  consensusGrade: number;

  @Field(() => Int, {nullable: true})
  consensusRating: number;

  @Field(() => Boolean, {defaultValue: false})
  sendStatus: boolean;

  @Field(() => String)
  createdAt: Date;
}

@ObjectType()
export class PaginatedProblems {
  @Field(() => [ProblemItem])
  problems: ProblemItem[];

  @Field()
  hasMore: boolean;
}

@InputType()
export class GetProblemsOptions {
  @Field()
  boardId: string;

  @Field()
  limit: number;

  @Field()
  order: boolean;

  @Field()
  sort: string;

  @Field()
  offset: number;

  @Field(() => String, { nullable: true })
  searchPattern: string;
}