import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';
import { Request, Response } from 'express';

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { passport?: { user: string } };
  };
  res: Response;
  redis: Redis;
};
