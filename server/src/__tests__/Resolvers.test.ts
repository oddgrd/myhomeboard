import { Connection } from 'typeorm';
import { testConn } from '../test-utils/testConn';
import faker from 'faker';
import { User } from '../entities/User';
import { gqlWrapper } from '../test-utils/gqlWrapper';
import { Board } from '../entities/Board';
import { Problem } from '../entities/Problem';
import { Ascent } from '../entities/Ascent';
import { Layout } from '../entities/Layout';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
  conn.runMigrations();
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
const editBoardMutation = `
  mutation EditBoard($options: EditBoardInput!) {
    editBoard(options: $options) {
      board {
        id
        title
        angles
        adjustable
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
        title
        rules
        id
        layoutId
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
const editProblemMutation = `
  mutation EditProblem($options: EditProblemInput!) {
    editProblem(options: $options) {
      problem {
        id
        title
        grade
        angle
        rules
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
const editAscentMutation = `
  mutation EditAscent($options: EditAscentInput!) {
    editAscent(options: $options)
  }

`;
const deleteAscentMutation = `
  mutation DeleteAscent($problemId: String!) {
    deleteAscent(problemId: $problemId)
  }
`;
const deleteProblemMutation = `
  mutation DeleteProblem($id: String!) {
    deleteProblem(id: $id)
  }
`;
const deleteBoardMutation = `
  mutation DeleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;
describe('Resolvers end to end test', () => {
  let userId: string;
  it('creates user', async () => {
    const userInput = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      googleId: faker.random.alphaNumeric(8),
    };
    const user = await User.create(userInput).save();

    expect(user).toMatchObject(userInput);

    userId = user.id;
    const dbUser = await User.findOne(userId);
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
      userId: userId,
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
    const board = await Board.findOne(boardId);
    expect(board).toBeDefined();
  });
  it('edits board', async () => {
    const editBoardInput = {
      boardId,
      title: faker.lorem.sentence(2),
      description: faker.lorem.sentence(3),
      adjustable: false,
      angles: [20],
      city: faker.address.city(),
      country: faker.address.country(),
    };
    const response = await gqlWrapper({
      source: editBoardMutation,
      variableValues: {
        options: editBoardInput,
      },
      userId: userId,
    });
    expect(response).toMatchObject({
      data: {
        editBoard: {
          board: {
            title: editBoardInput.title,
            adjustable: false,
            angles: [20],
          },
          errors: null,
        },
      },
    });
    const board = await Board.findOne(boardId);
    expect(board).toBeDefined();
    expect(board!.adjustable).toBeFalsy();
  });
  let problemId: string;
  it('creates problem', async () => {
    // Layout from dummydata migration
    const layout = await Layout.findOne({ where: { title: 'testlayout' } });

    const problemInput = {
      title: faker.name.firstName(),
      rules: faker.lorem.sentence(3),
      layoutId: layout!.id,
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
      userId: userId,
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
    const problem = await Problem.findOne(problemId);
    expect(problem).toBeDefined();
  });
  it('edits problem', async () => {
    const editProblemInput = {
      problemId,
      title: 'edited',
      rules: faker.lorem.sentence(3),
      grade: 5,
      angle: 30,
    };
    const response = await gqlWrapper({
      source: editProblemMutation,
      variableValues: {
        options: editProblemInput,
      },
      userId: userId,
    });
    expect(response).toMatchObject({
      data: {
        editProblem: {
          problem: {
            title: 'edited',
            rules: editProblemInput.rules,
            grade: 5,
            angle: 30,
          },
          errors: null,
        },
      },
    });
    const problem = await Problem.findOne(problemId);
    expect(problem).toBeDefined();
    expect(problem!.title).toMatch('edited');
  });
  it('adds ascent', async () => {
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
      userId: userId,
    });
    expect(response).toMatchObject({
      data: {
        addAscent: true,
      },
    });

    const ascent = await Ascent.findOne({ where: { problemId } });
    expect(ascent).toBeDefined();
  });
  it('edits ascent', async () => {
    const editAscentInput = {
      problemId,
      comment: faker.lorem.sentence(3),
      grade: 5,
      rating: 0,
      attempts: 1,
    };
    const response = await gqlWrapper({
      source: editAscentMutation,
      variableValues: {
        options: editAscentInput,
      },
      userId: userId,
    });
    expect(response).toMatchObject({
      data: {
        editAscent: true,
      },
    });

    const ascent = await Ascent.findOne({ where: { problemId } });
    expect(ascent).toBeDefined();
    expect(ascent).toMatchObject(editAscentInput);
  });
  it('deletes ascent', async () => {
    const response = await gqlWrapper({
      source: deleteAscentMutation,
      variableValues: {
        problemId,
      },
      userId: userId,
    });
    expect(response).toMatchObject({
      data: {
        deleteAscent: true,
      },
    });

    const ascent = await Ascent.findOne({ where: { problemId } });
    expect(ascent).toBeUndefined();
  });
  it('deletes problem', async () => {
    const response = await gqlWrapper({
      source: deleteProblemMutation,
      variableValues: {
        id: problemId,
      },
      userId: userId,
    });
    expect(response).toMatchObject({
      data: {
        deleteProblem: true,
      },
    });

    const problem = await Problem.findOne({ where: { id: problemId } });
    expect(problem).toBeUndefined();
  });
  it('deletes board', async () => {
    const response = await gqlWrapper({
      source: deleteBoardMutation,
      variableValues: {
        boardId,
      },
      userId: userId,
    });
    expect(response).toMatchObject({
      data: {
        deleteBoard: true,
      },
    });

    const board = await Board.findOne({ where: { id: boardId } });
    expect(board).toBeUndefined();
  });
});
