import faker from 'faker';
import { User } from '../../entities/User';
import { gqlWrapper } from '../../test-utils/gqlWrapper';
import { removeFromWhitelistMutation, whitelistUserMutation } from '../../test-utils/gqlMutations';
import { getDummyData } from '../../test-utils/utils';

describe('User tests', () => {
  it('should create user', async () => {
    const newUser = await User.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      avatar: faker.internet.url(),
      googleId: faker.random.alphaNumeric(8),
    }).save();

    const user = await User.findOne(newUser!.id);
    expect(user).toBeDefined();
    expect(user?.name).toMatch(newUser.name);
  });

  it('should whitelist user', async () => {
    const {user, boardId} = await getDummyData();

    const whitelistInput = {
      email: user?.email,
      boardId,
    };

    const response = await gqlWrapper({
      source: whitelistUserMutation,
      variableValues: {
        options: whitelistInput,
      },
      userId: user?.id,
    });

    expect(response).toMatchObject({
      data: {
        whitelistUser: {
          errors: null,
          userId: user?.id,
        },
      },
    });

    const whitelistedUser = await User.findOne(user?.id);
    expect(whitelistedUser!.boardWhitelist).toContain(boardId);
  });

  it('should error on whitelisting invalid user', async () => {
    const {user, boardId} = await getDummyData();

    const whitelistInput = {
      email: faker.internet.email(),
      boardId,
    };

    const response = await gqlWrapper({
      source: whitelistUserMutation,
      variableValues: {
        options: whitelistInput,
      },
      userId: user?.id,
    });

    expect(response).toMatchObject({
      data: {
        whitelistUser: {
          errors: [
            {
              field: 'email',
              message: "User doesn't exist",
            },
          ],
          userId: null,
        },
      },
    });
  });

  it('should remove user from whitelist', async () => {
    const {user, boardId} = await getDummyData();

    const whitelistInput = {
      email: user?.email,
      boardId,
    };

    const response = await gqlWrapper({
      source: removeFromWhitelistMutation,
      variableValues: {
        options: whitelistInput,
      },
      userId: user?.id,
    });

    expect(response).toMatchObject({
      data: {
        removeFromWhitelist: {
          errors: null,
          userId: user?.id,
        },
      },
    });
    const whitelistedUser = await User.findOne(user?.id);
    expect(whitelistedUser!.boardWhitelist).not.toContain(boardId);
  });
});
