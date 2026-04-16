import { runMongo }     from './seeders/mongoseed.js';
import { runSQL } from './seeders/sqlseed.js';

async function runAll() {
  await runMongo();
  await runSQL();
  console.log('seeded');
}

runAll()