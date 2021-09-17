import { User } from '../entities/User';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../types/context';

@Resolver(User)
export class UserResolver {
  // Confirm logged in
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    if (!req.session.passport?.user) {
      return null;
    }
    const user = await User.findOne(req.session.passport.user);
    if (!user) return null;
    return user;
  }

  // Get user by ID
  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id') id: string): Promise<User | null> {
    const user = await User.findOne({ where: { id }, relations: ['problems'] });
    if (!user) return null;
    return user;
  }

  // Get all users
  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[] | null> {
    const users = await User.find();
    if (!users) return null;
    return users;
  }

  // Log out
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        if (error) {
          console.log(error);
          resolve(false);
          return;
        }
        res.clearCookie('mhb');
        resolve(true);
      })
    );
  }
}
