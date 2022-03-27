import faker from 'faker';
import { gqlWrapper } from '../../test-utils/gqlWrapper';
import { Problem } from '../../entities/Problem';
import { createProblem, getDummyData } from '../../test-utils/utils';
import { deleteProblemMutation, editProblemMutation } from '../../test-utils/gqlMutations';

describe('Problem tests', () => {
  it('should create problem', async () => {
    const { response, problemInput } = await createProblem();

    expect(response).toMatchObject({
      data: {
        createProblem: {
          problem: problemInput,
          errors: null,
        },
      },
    });

    let problemId = response.data!.createProblem.problem.id;
    const problem = await Problem.findOne(problemId);

    expect(problem).toBeDefined();
    expect(problem!.title).toMatch(problemInput.title);
  });

  it('should edit problem', async () => {
    const { response: createProblemResponse } =
      await createProblem();
    expect(createProblemResponse.data).toBeDefined();

    let problemId = createProblemResponse.data!.createProblem.problem.id;
    const { user } = await getDummyData();
    expect(user?.id).toBeDefined();

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
      userId: user?.id,
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
    const { response: createProblemResponse } =
      await createProblem();
    expect(createProblemResponse.data).toBeDefined();

    let problemId = createProblemResponse.data!.createProblem.problem.id;
    const { user } = await getDummyData();
    expect(user?.id).toBeDefined();

    const response = await gqlWrapper({
      source: deleteProblemMutation,
      variableValues: {
        id: problemId,
      },
      userId: user?.id,
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