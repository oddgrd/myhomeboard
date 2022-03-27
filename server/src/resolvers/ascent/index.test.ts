import faker from 'faker';
import { gqlWrapper } from '../../test-utils/gqlWrapper';
import { Ascent } from '../../entities/Ascent';
import {  deleteAscentMutation, editAscentMutation } from '../../test-utils/gqlMutations';
import { addAscent, getDummyData } from '../../test-utils/utils';

describe('Ascent tests', () => {
  it('adds ascent', async () => {
    const {response, ascentInput } = await addAscent(); 

    expect(response).toMatchObject({
      data: {
        addAscent: true,
      },
    });

    const ascent = await Ascent.findOne({ where: { problemId: ascentInput.problemId } });
    expect(ascent).toBeDefined();
  });

  it('edits ascent', async () => {
    const {user} = await getDummyData();

    const {response: addAscentResponse, ascentInput } = await addAscent(); 
    expect(addAscentResponse).toMatchObject({
      data: {
        addAscent: true,
      },
    });

    const editAscentInput = {
      problemId: ascentInput.problemId,
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
      userId: user?.id,
    });

    expect(response).toMatchObject({
      data: {
        editAscent: true,
      },
    });

    const ascent = await Ascent.findOne({ where: { problemId: ascentInput.problemId } });
    expect(ascent).toBeDefined();
    expect(ascent).toMatchObject(editAscentInput);
  });

  it('deletes ascent', async () => {
    const {user} = await getDummyData();
    
    const {response: addAscentResponse, ascentInput } = await addAscent(); 
    expect(addAscentResponse).toMatchObject({
      data: {
        addAscent: true,
      },
    });

    const response = await gqlWrapper({
      source: deleteAscentMutation,
      variableValues: {
        problemId: ascentInput.problemId,
      },
      userId: user?.id,
    });
    expect(response).toMatchObject({
      data: {
        deleteAscent: true,
      },
    });

    const ascent = await Ascent.findOne({ where: { problemId: ascentInput.problemId } });
    expect(ascent).toBeUndefined();
  });
});
