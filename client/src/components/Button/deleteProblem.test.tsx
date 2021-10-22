import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import renderer from 'react-test-renderer';
import { DeleteProblem } from './deleteProblem';
import { DeleteProblemDocument } from '../../generated/graphql';

it('should render without error', () => {
  renderer.create(
    <MockedProvider mocks={[]}>
      <DeleteProblem id={'1'} boardId={'2'} />
    </MockedProvider>
  );
});
