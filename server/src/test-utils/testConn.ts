import 'dotenv/config';
import path from 'path';
import { createConnection } from 'typeorm';
import { Ascent } from '../entities/Ascent';
import { Board } from '../entities/Board';
import { Layout } from '../entities/Layout';
import { Problem } from '../entities/Problem';
import { User } from '../entities/User';

export const testConn = async (drop: boolean = false) => {
  const connection = await createConnection({
    applicationName: 'myhomeboardtest',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(`${process.env.POSTGRES_PORT}`),
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: drop,
    dropSchema: drop,
    entities: [User, Problem, Layout, Ascent, Board],
    migrations: [path.join(__dirname, './testMigrations/*')],
  });

  return connection;
};
