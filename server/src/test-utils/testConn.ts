import 'dotenv/config';
import path from 'path';
import { createConnection } from 'typeorm';
import { Ascent } from '../entities/Ascent';
import { Board } from '../entities/Board';
import { Layout } from '../entities/Layout';
import { Problem } from '../entities/Problem';
import { User } from '../entities/User';

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
if (!POSTGRES_HOST || !POSTGRES_PORT) {
  throw new Error('Missing required env var: POSTGRES_HOST or POSTGRES_PORT');
}

export const testConn = async (drop: boolean = false) => {
  return createConnection({
    applicationName: 'myhomeboardtest',
    type: 'postgres',
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    dropSchema: drop,
    entities: [User, Problem, Layout, Ascent, Board],
    migrations: [path.join(__dirname, './testMigrations/*')],
  });
};
