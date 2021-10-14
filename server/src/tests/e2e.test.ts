import { Connection } from 'typeorm';
import { testConn } from '../test-utils/testConn';
import faker from 'faker';
import { User } from '../entities/User';
import { gqlWrapper } from '../test-utils/gqlWrapper';
import { Board } from '../entities/Board';
import { Problem } from '../entities/Problem';
import { Ascent } from '../entities/Ascent';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const createBoardMutation = `
mutation CreateBoard($options: BoardInput!) {
  createBoard(options: $options) {
    board {
      id
      title
    }
    errors {
      message
      field
    }
  }
}
`;
const createProblemMutation = `
mutation CreateProblem($options: CreateProblemInput!) {
    createProblem(options: $options) {
      problem {
        id
        title
        rules
        layoutUrl
        boardId
        grade
        angle
        coordinates {
            x
            y
            color
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
const addAscentMutation = `
mutation AddAscent($options: AddAscentInput!) {
  addAscent(options: $options)
}
`;
describe('End to end test', () => {
  let user: User;
  it('creates user', async () => {
    const userInput = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      googleId: faker.random.alphaNumeric(8),
    };
    user = await User.create(userInput).save();

    expect(user).toMatchObject(userInput);

    const dbUser = await User.findOne({ where: { googleId: user.googleId } });
    expect(dbUser).toBeDefined();
  });

  let boardId: string;
  it('creates board', async () => {
    const boardInput = {
      title: faker.lorem.sentence(2),
      description: faker.lorem.sentence(3),
      adjustable: true,
      angles: [20, 30],
      city: faker.address.city(),
      country: faker.address.country(),
    };
    const response = await gqlWrapper({
      source: createBoardMutation,
      variableValues: {
        options: boardInput,
      },
      userId: user.id,
    });
    expect(response).toMatchObject({
      data: {
        createBoard: {
          board: {
            title: boardInput.title,
          },
          errors: null,
        },
      },
    });
    boardId = response.data!.createBoard.board.id;
    const board = Board.findOne(boardId);
    expect(board).toBeDefined();
  });

  let problemId: string;
  it('creates problem', async () => {
    const problemInput = {
      title: faker.name.firstName(),
      rules: faker.lorem.sentence(3),
      layoutUrl: faker.internet.avatar(),
      boardId,
      grade: 10,
      angle: 30,
      coordinates: [
        {
          x: 200,
          y: 150,
          color: 'red',
        },
        {
          x: 100,
          y: 180,
          color: 'green',
        },
        {
          x: 80,
          y: 200,
          color: 'blue',
        },
      ],
    };

    const response = await gqlWrapper({
      source: createProblemMutation,
      variableValues: {
        options: problemInput,
      },
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        createProblem: {
          problem: problemInput,
          errors: null,
        },
      },
    });
    problemId = response.data!.createProblem.problem.id;
    const problem = Problem.findOne(problemId);
    expect(problem).toBeDefined();
  });

  it('adds ascents', async () => {
    const ascentInput = {
      problemId,
      boardId,
      comment: faker.lorem.sentence(3),
      grade: 10,
      rating: 2,
      attempts: 6,
    };
    const response = await gqlWrapper({
      source: addAscentMutation,
      variableValues: {
        options: ascentInput,
      },
      userId: user.id,
    });
    expect(response).toMatchObject({
      data: {
        addAscent: true,
      },
    });

    const ascent = Ascent.findOne({ where: { problemId } });
    expect(ascent).toBeDefined();
  });
});
