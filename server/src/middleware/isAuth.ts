import { Context } from '../types/context';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('not authenticated');
  }
  return next();
};
