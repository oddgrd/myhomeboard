import faker from 'faker';
import { User } from '../../entities/User';
import { gqlWrapper } from '../../test-utils/gqlWrapper';
import { Board } from '../../entities/Board';
import { Problem } from '../../entities/Problem';
import { Layout } from '../../entities/Layout';

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

const deleteProblemMutation = `
  mutation DeleteProblem($id: String!) {
    deleteProblem(id: $id)
  }
`;

describe('Problem tests', () => {
  let userId: string;
  let problemId: string;
  it('should create problem', async () => {
    // Layout, user and board from dummydata
    const layout = await Layout.findOne({ where: { title: 'testlayout' } });
    const user = await User.findOne({ where: { name: 'odd' } });
    const board = await Board.findOne({ where: { title: 'test' } });
    userId = user!.id;

    const problemInput = {
      title: faker.name.firstName(),
      rules: faker.lorem.sentence(3),
      layoutId: layout!.id,
      boardId: board!.id,
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
    expect(problem!.title).toMatch(problemInput.title);
  });

  it('should edit problem', async () => {
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

  it('should delete problem', async () => {
    const response = await gqlWrapper({
      source: deleteProblemMutation,
      variableValues: {
        id: problemId,
      },
      userId,
    });
    expect(response).toMatchObject({
      data: {
        deleteProblem: true,
      },
    });

    const problem = await Problem.findOne({ where: { id: problemId } });
    expect(problem).toBeUndefined();
  });
});
