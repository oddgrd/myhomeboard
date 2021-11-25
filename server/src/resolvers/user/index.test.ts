import faker from 'faker';
import { User } from '../../entities/User';
import { gqlWrapper } from '../../test-utils/gqlWrapper';
import { Board } from '../../entities/Board';

const whitelistUserMutation = `
  mutation WhitelistUser($options: WhitelistInput!) {
    whitelistUser(options: $options) {
      errors {
        field
        message
      }
      userId
    }
  }
`;
const removeFromWhitelistMutation = `
  mutation RemoveFromWhitelist($options: WhitelistInput!) {
    removeFromWhitelist(options: $options) {
      errors {
        field
        message
      }
      userId
    }
  }
`;

describe('User tests', () => {
  let userId: string;
  let email: string;
  it('should create user', async () => {
    const newUser = await User.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      avatar: faker.internet.url(),
      googleId: faker.random.alphaNumeric(8),
    }).save();
    [userId, email] = [newUser!.id, newUser!.email];

    const user = await User.findOne(newUser!.id);
    expect(user).toBeDefined();
    expect(user?.name).toMatch(newUser.name);
  });

  let boardId: string;
  it('should whitelist user', async () => {
    // get board from dummy data
    const board = await Board.findOne({ where: { title: 'test' } });
    boardId = board!.id;
    const whitelistInput = {
      email,
      boardId,
    };

    const response = await gqlWrapper({
      source: whitelistUserMutation,
      variableValues: {
        options: whitelistInput,
      },
      userId,
    });

    expect(response).toMatchObject({
      data: {
        whitelistUser: {
          errors: null,
          userId,
        },
      },
    });
    const whitelistedUser = await User.findOne(userId);
    expect(whitelistedUser!.boardWhitelist).toContain(boardId);
  });

  it('should error on invalid user', async () => {
    const whitelistInput = {
      email: faker.internet.email(),
      boardId,
    };

    const response = await gqlWrapper({
      source: whitelistUserMutation,
      variableValues: {
        options: whitelistInput,
      },
      userId,
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
    const whitelistInput = {
      email,
      boardId,
    };

    const response = await gqlWrapper({
      source: removeFromWhitelistMutation,
      variableValues: {
        options: whitelistInput,
      },
      userId,
    });

    expect(response).toMatchObject({
      data: {
        removeFromWhitelist: {
          errors: null,
          userId,
        },
      },
    });
    const whitelistedUser = await User.findOne(userId);
    expect(whitelistedUser!.boardWhitelist).not.toContain(boardId);
  });
});
