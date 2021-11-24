import React from 'react';
import Faq from '../pages/faq';
import { mockRouter } from '../utils/testUtils';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('Faq Page', () => {
  it('should render with title and back button', async () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    const { getByText, getByLabelText } = render(<Faq />);

    const title = getByText('F.A.Q');
    expect(title).toBeInTheDocument();

    const back = getByLabelText('Go back');
    expect(back).toBeInTheDocument();
    expect(back).toBeEnabled();

    fireEvent.click(back);

    await waitFor(() => {
      expect(mockRouter.back).toHaveBeenCalled();
    });
  });
});
