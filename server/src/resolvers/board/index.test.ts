import faker from 'faker';
import { gqlWrapper } from '../../test-utils/gqlWrapper';
import { Board } from '../../entities/Board';
import { deleteBoardMutation, editBoardMutation } from '../../test-utils/gqlMutations';
import { createBoard, getDummyData } from '../../test-utils/utils';

describe('Board tests', () => {
  it('should create board', async () => {
    const {response, boardInput} = await createBoard();

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

    const board = await Board.findOne(response.data!.createBoard.board.id);
    expect(board).toBeDefined();
  });

  it('should edit board', async () => {
    const {user} = await getDummyData();

    const {response: createBoardResponse} = await createBoard();
    let boardId = createBoardResponse.data!.createBoard.board.id;
    expect(boardId).toBeDefined();

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
      userId: user?.id,
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
    const {user} = await getDummyData();

    const {response: createBoardResponse} = await createBoard();
    let boardId = createBoardResponse.data?.createBoard.board.id;
    expect(boardId).toBeDefined();

    const response = await gqlWrapper({
      source: deleteBoardMutation,
      variableValues: {
        boardId,
      },
      userId: user?.id,
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
