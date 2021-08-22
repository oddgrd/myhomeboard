import { Context } from '../types/context';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.passport?.user) {
    throw new Error('not authenticated');
  }
  return next();
};
