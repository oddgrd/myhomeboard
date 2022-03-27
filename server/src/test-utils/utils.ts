import faker from 'faker';
import { addAscentMutation, createBoardMutation, createProblemMutation } from './gqlMutations';
import { gqlWrapper } from './gqlWrapper';
import { Layout } from '../entities/Layout';
import { Board } from '../entities/Board';
import { Problem } from '../entities/Problem';
import { User } from '../entities/User';

export const getDummyData = async () =>  {
    const user = await User.findOne({ where: { name: 'odd' } });
    const board = await Board.findOne({ where: { title: 'test' } });
    const layout = await Layout.findOne({ where: { title: 'testlayout' } });
    const problem = await Problem.findOne({ where: { title: 'testproblem' } });

    return {user: user, boardId: board?.id, layoutId: layout?.id, problemId: problem?.id};
}

export const createProblem = async () => {
    const {user, boardId, layoutId} = await getDummyData();

    const problemInput = {
        title: faker.name.firstName(),
        rules: faker.lorem.sentence(3),
        layoutId,
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
        userId: user?.id,
      });

      return {response, problemInput};
}

export const createBoard = async () => {
    const {user} = await getDummyData();

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
      userId: user?.id,
    });

    return {response, boardInput};
}

export const addAscent = async () => {
    const {user, boardId } = await getDummyData();

    // Create a new problem for each ascent test
    let newProblem = await createProblem();

    const ascentInput = {
      problemId: newProblem.response.data!.createProblem.problem.id,
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
      userId: user?.id,
    });

    return {response, ascentInput};
}