import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';
import { Request, Response } from 'express';
import DataLoader from 'dataloader';
import { User } from '../entities/User';

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { passport?: { user: string } };
  };
  res: Response;
  redis: Redis;
  userLoader: DataLoader<string, User, string>;
};
