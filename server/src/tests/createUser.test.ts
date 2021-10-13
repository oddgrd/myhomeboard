import { Connection } from 'typeorm';
import { testConn } from '../test-utils/testConn';
import faker from 'faker';
import { User } from '../entities/User';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

test('Create user', async () => {
  const userInput = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    googleId: faker.random.alphaNumeric(8),
  };
  const user = await User.create(userInput).save();
  console.log(user);
  expect(user).toMatchObject({
    name: userInput.name,
    email: userInput.email,
    avatar: userInput.avatar,
    googleId: userInput.googleId,
  });

  const dbUser = await User.findOne({ where: { googleId: user.googleId } });
  expect(dbUser).toBeDefined();
});
