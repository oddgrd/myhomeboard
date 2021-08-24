import { User } from '../entities/User';
// import { validateRegister } from '../utils/validateRegister';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../types/context';
// import { UsernamePasswordInput, UserResponse } from '../types/userTypes';
// import argon2 from 'argon2';

@Resolver()
export class UserResolver {
  // // Register user
  // @Mutation(() => UserResponse)
  // async register(
  //   @Arg('options') options: UsernamePasswordInput,
  //   @Ctx() { req }: Context
  // ): Promise<UserResponse> {
  //   const errors = validateRegister(options);
  //   if (errors) {
  //     return { errors };
  //   }

  //   const user = await User.findOne({ where: { username: options.username } });
  //   if (user) {
  //     return {
  //       errors: [{ field: 'username', message: 'Username already exists' }]
  //     };
  //   }

  //   const hashedPassword = await argon2.hash(options.password);

  //   const newUser = await User.create({
  //     username: options.username,
  //     email: options.email,
  //     password: hashedPassword
  //   }).save();

  //   // Persist user in express session
  //   req.session.userId = newUser.id;
  //   return { user: newUser };
  // }

  // // Login user
  // @Mutation(() => UserResponse)
  // async login(
  //   @Arg('usernameOrEmail') usernameOrEmail: string,
  //   @Arg('password') password: string,
  //   @Ctx() { req }: Context
  // ): Promise<UserResponse> {
  //   const user = await User.findOne(
  //     usernameOrEmail.includes('@')
  //       ? { where: { email: usernameOrEmail } }
  //       : { where: { username: usernameOrEmail } }
  //   );
  //   if (!user) {
  //     return {
  //       errors: [
  //         { field: 'usernameOrEmail', message: 'Invalid username/email' }
  //       ]
  //     };
  //   }
  //   const valid = await argon2.verify(user.password, password);
  //   if (!valid) {
  //     return {
  //       errors: [{ field: 'password', message: 'Invalid Login' }]
  //     };
  //   }

  //   // Persist user in express session
  //   req.session.userId = user.id;
  //   return { user };
  // }

  // Confirm logged in
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    if (!req.session.passport?.user) {
      console.log('no passport?:', req.session);
      return null;
    }
    console.log('passport?:', req.session);
    const user = await User.findOne(req.session.passport.user);
    if (!user) return null;
    return user;
  }

  // Get user by ID
  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id') id: string): Promise<User | null> {
    const user = await User.findOne(id);
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
