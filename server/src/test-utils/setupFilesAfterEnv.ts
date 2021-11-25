import { Connection } from 'typeorm';
import { testConn } from './testConn';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
  await conn.runMigrations();
});
afterAll(async () => {
  await conn.close();
});
