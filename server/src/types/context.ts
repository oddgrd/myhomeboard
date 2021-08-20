import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  redis: Redis;
};
