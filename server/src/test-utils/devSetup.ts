import 'dotenv/config';
import { testConn } from './testConn';

const devSetup = async () => {
    const drop = process.argv.includes('--fresh');
    const conn = await testConn(drop);
    await conn.runMigrations();
    await conn.close();
    console.log('Dev seed complete');
};

devSetup().catch(console.error);