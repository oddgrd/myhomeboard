import { NextRouter } from 'next/router';

const confirm = jest.spyOn(window, 'confirm');

export const mockConfirm = () => {
  confirm.mockImplementationOnce(jest.fn(() => true));
};

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
