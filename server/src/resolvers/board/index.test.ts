import faker from 'faker';
import { User } from '../../entities/User';
import { gqlWrapper } from '../../test-utils/gqlWrapper';
import { Board } from '../../entities/Board';

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
const deleteBoardMutation = `
  mutation DeleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;

describe('Board tests', () => {
  let userId: string;
  let boardId: string;
  it('should create board', async () => {
    // get user from dummy data
    const user = await User.findOne({ where: { name: 'odd' } });
    userId = user!.id;
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
      userId,
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

  it('should edit board', async () => {
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
      userId,
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
    expect(board!.angles.length).toBe(1);
  });

  it('should delete board', async () => {
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
