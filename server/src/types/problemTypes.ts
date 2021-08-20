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
export class Coords {
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

  @Field(() => Coords)
  coordinates: Coords;
}
