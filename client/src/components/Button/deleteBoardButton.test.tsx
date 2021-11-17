import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import faker from 'faker';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { DeleteBoardDocument } from '../../generated/graphql';
import { mockConfirm, mockRouter } from '../../utils/testUtils';
import { DeleteBoardButton } from './deleteBoardButton';

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

describe('Delete Board Button', () => {
  it('should render without error', async () => {
    render(
      <MockedProvider mocks={[]}>
        <DeleteBoardButton boardId={'uuid2'} />
      </MockedProvider>
    );
  });

  it('should delete, give visual feedback and router.replace to boards page', async () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const variables = {
      boardId: faker.datatype.uuid(),
    };

    const mocks = [
      {
        request: {
          query: DeleteBoardDocument,
          variables,
        },
        result: { data: { deleteBoard: true } },
      },
    ];

    const { findByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteBoardButton boardId={variables.boardId} />
      </MockedProvider>
    );
    mockConfirm();

    const button = await findByLabelText('Delete Board');
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Board deleted ☠️');
    });
    expect(mockRouter.replace).toHaveBeenCalledWith(`/boards`);
  });
});
