import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { DeleteProblemButton } from './deleteProblemButton';
import { DeleteProblemDocument } from '../../generated/graphql';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mockConfirm, mockRouter } from '../../utils/testUtils';
import faker from 'faker';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  __esModule: true,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('Delete Problem Button', () => {
  it('should render without error', async () => {
    render(
      <MockedProvider mocks={[]}>
        <DeleteProblemButton id={'uuid1'} boardId={'uuid2'} />
      </MockedProvider>
    );
  });

  it('should delete, give visual feedback and router.push to parent board', async () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
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
        <DeleteProblemButton {...variables} boardId={boardId} />
      </MockedProvider>
    );
    mockConfirm();

    const button = await findByLabelText('Delete Problem');
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Problem deleted ☠️');
    });
    expect(mockRouter.push).toHaveBeenCalledWith(`/boards/${boardId}`);
  });
});
