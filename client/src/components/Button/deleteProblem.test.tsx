import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { DeleteProblem } from './deleteProblem';
import { DeleteProblemDocument } from '../../generated/graphql';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  mockNextUseRouter,
  mockReactToastify,
  mockRouter,
  mockToast,
} from '../../utils/testUtils';

let confirmSpy: jest.SpyInstance<boolean, [message?: string | undefined]>;
beforeAll(() => {
  confirmSpy = jest.spyOn(window, 'confirm');
  confirmSpy.mockImplementation(jest.fn(() => true));
});
afterAll(() => confirmSpy.mockRestore());

describe('Delete Problem Button', () => {
  it('should render without error', async () => {
    render(
      <MockedProvider mocks={[]}>
        <DeleteProblem id={'uuid1'} boardId={'uuid2'} />
      </MockedProvider>
    );
  });

  it('should delete, give visual feedback and router.push to parent board', async () => {
    const mocks = [
      {
        request: {
          query: DeleteProblemDocument,
          variables: { id: 'uuid1' },
        },
        result: { data: { deleteProblem: true } },
      },
    ];

    const { getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteProblem id={'uuid1'} boardId={'uuid2'} />
      </MockedProvider>
    );

    mockNextUseRouter();
    mockReactToastify();

    const button = getByLabelText('Delete Problem');
    expect(button).not.toBeNull();
    expect(button).toBeEnabled();

    fireEvent.click(button);

    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/boards/uuid2');
      expect(mockToast.success).toHaveBeenCalledWith('Problem deleted ☠️');
    });
  });
});
