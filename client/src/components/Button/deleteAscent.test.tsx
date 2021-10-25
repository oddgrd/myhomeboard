import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { DeleteAscentDocument } from '../../generated/graphql';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mockConfirm } from '../../utils/testUtils';
import { DeleteAscent } from './deleteAscent';
import faker from 'faker';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  __esModule: true,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Delete Ascent Button', () => {
  it('should render without error', async () => {
    render(
      <MockedProvider mocks={[]}>
        <DeleteAscent id={'uuid1'} />
      </MockedProvider>
    );
  });

  it('should delete and give visual feedback', async () => {
    const variables = {
      problemId: faker.datatype.uuid(),
    };
    const mocks = [
      {
        request: {
          query: DeleteAscentDocument,
          variables,
        },
        result: { data: { deleteAscent: true } },
      },
    ];

    const { findByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteAscent id={variables.problemId} />
      </MockedProvider>
    );

    mockConfirm();

    const button = await findByLabelText('Delete Ascent');
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.click(button);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Ascent deleted ☠️');
    });
  });
});
