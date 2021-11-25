import faker from 'faker';
import { User } from '../../entities/User';
import { gqlWrapper } from '../../test-utils/gqlWrapper';
import { Board } from '../../entities/Board';
import { Problem } from '../../entities/Problem';
import { Ascent } from '../../entities/Ascent';

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

describe('Ascent tests', () => {
  let userId: string;
  let problemId: string;
  it('adds ascent', async () => {
    // Get user, board and problem ids from dummy data
    const user = await User.findOne({ where: { name: 'odd' } });
    userId = user!.id;
    const board = await Board.findOne({ where: { title: 'test' } });
    const problem = await Problem.findOne({ where: { title: 'testproblem' } });
    problemId = problem!.id;

    const ascentInput = {
      problemId,
      boardId: board!.id,
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
});
