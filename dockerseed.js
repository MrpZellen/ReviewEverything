import { runMongo }     from './seeders/dockermongoseed.js';
import { runSQL } from './seeders/dockersqlseed.js';

async function runAll() {
  await runMongo();
  await runSQL();
  console.log('seeded');
}

runAll()