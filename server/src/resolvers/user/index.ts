import { User } from '../../entities/User';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Context } from '../../types/context';
import { getConnection } from 'typeorm';
import { __prod__ } from '../../constants';
import { isAuth } from '../../middleware/isAuth';
import { WhitelistInput, WhitelistResponse } from './types';

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
  async getUser(@Arg('id') id: string): Promise<User | null> {
    const user = await getConnection()
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.problems', 'problem')
      .leftJoinAndSelect('problem.ascents', 'ascent')
      .leftJoinAndSelect('user.ascents', 'a')
      .where('user.id = :id', { id })
      .getOne();

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
        res.clearCookie('mhb', {
          domain: __prod__ ? '.myhomeboard.no' : undefined,
        });
        resolve(true);
      })
    );
  }

  // Whitelist user
  // PRIVATE
  @Mutation(() => WhitelistResponse)
  @UseMiddleware(isAuth)
  async whitelistUser(@Arg('options') options: WhitelistInput) {
    const user = await User.findOne({ where: { email: options.email } });
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: "User doesn't exist",
          },
        ],
      };
    }
    if (user.boardWhitelist && user.boardWhitelist.includes(options.boardId)) {
      return {
        errors: [
          {
            field: 'email',
            message: 'User already whitelisted',
          },
        ],
      };
    }

    await getConnection().query(
      `
      UPDATE "user" 
      SET "boardWhitelist" = array_append("boardWhitelist", $1) 
      WHERE id = $2;
    `,
      [options.boardId, user.id]
    );

    return { userId: user.id };
  }
}
