import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';
import { User } from '../entities/User';
import { InputType, Field, ObjectType } from 'type-graphql';

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  redis: Redis;
};

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
