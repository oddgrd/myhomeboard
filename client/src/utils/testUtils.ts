import { NextRouter } from 'next/router';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const toast = jest.spyOn(require('react-toastify'), 'toast');

export const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isPreview: false,
  isReady: true,
  isFallback: false,
  isLocaleDomain: false,
};
export const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
};

export const mockNextUseRouter = () => {
  useRouter.mockImplementationOnce(() => mockRouter);
};

export const mockReactToastify = () => {
  toast.mockImplementationOnce(() => mockToast);
};
