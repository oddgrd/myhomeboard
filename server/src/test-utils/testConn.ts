import 'dotenv-safe/config';
import { createConnection } from 'typeorm';
import { Ascent } from '../entities/Ascent';
import { Board } from '../entities/Board';
import { Layout } from '../entities/Layout';
import { Problem } from '../entities/Problem';
import { User } from '../entities/User';

export const testConn = (drop: boolean = false) => {
  return createConnection({
    applicationName: 'myhomeboardtest',
    type: 'postgres',
    url: process.env.DATABASE_URL + 'test',
    synchronize: drop,
    dropSchema: drop,
    entities: [User, Problem, Layout, Ascent, Board],
  });
};
