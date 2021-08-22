import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { passport?: { user: string } };
  };
  res: Response;
  redis: Redis;
};
