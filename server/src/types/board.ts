import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class BoardInput {
  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  description: string;

  @Field()
  adjustable: boolean;

  @Field(() => [Int])
  angles: number[];

  @Field({ nullable: true })
  location: string;
}
