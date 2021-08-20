import { User } from '../entities/User';
import { validateRegister } from '../utils/validateRegister';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext, UsernamePasswordInput, UserResponse } from './types';
import argon2 from 'argon2';
@Resolver()
export class UserResolver {
  // Register user
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const user = await User.findOne({ where: { username: options.username } });
    if (user) {
      return {
        errors: [{ field: 'username', message: 'Username already exists' }]
      };
    }

    const hashedPassword = await argon2.hash(options.password);

    const newUser = await User.create({
      username: options.username,
      email: options.email,
      password: hashedPassword
    }).save();

    req.session.userId = newUser.id;
    return { user: newUser };
  }

  // Get user by ID
  @Query(() => User, { nullable: true })
  async getUserById(
    @Arg('id', () => Int) id: number
  ): Promise<User | undefined> {
    return User.findOne(id);
  }

  // Get all users
  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[] | null> {
    const users = await User.find();
    if (!users) return null;
    return users;
  }
}
