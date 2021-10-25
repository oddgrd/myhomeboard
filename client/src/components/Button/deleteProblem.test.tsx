import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { DeleteProblem } from './deleteProblem';
import { DeleteProblemDocument } from '../../generated/graphql';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  mockNextUseRouter,
  mockRouter,
  mockConfirm,
  mockReactToastify,
  mockToast,
} from '../../utils/testUtils';
import faker from 'faker';

describe('Delete Problem Button', () => {
  it('should render without error', async () => {
    render(
      <MockedProvider mocks={[]}>
        <DeleteProblem id={'uuid1'} boardId={'uuid2'} />
      </MockedProvider>
    );
  });

  it('should delete, give visual feedback and router.push to parent board', async () => {
    const variables = {
      id: faker.datatype.uuid(),
    };
    const boardId = faker.datatype.uuid();

    const mocks = [
      {
        request: {
          query: DeleteProblemDocument,
          variables,
        },
        result: { data: { deleteProblem: true } },
      },
    ];

    const { findByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteProblem {...variables} boardId={boardId} />
      </MockedProvider>
    );

    mockConfirm();
    mockNextUseRouter();
    mockReactToastify();

    const button = await findByLabelText('Delete Problem');
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('Problem deleted ☠️');
      expect(mockRouter.push).toHaveBeenCalledWith(`/boards/${boardId}`);
    });
  });
});
