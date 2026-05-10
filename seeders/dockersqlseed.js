import pkg from 'pg';
const { Client } = pkg;

const users = [
  {
    username:     'grubulon_schmeeze',
    description:  'Self-appointed cinematic overlord. If it has lens flare, I have opinions.',
    movieReviews: [1226863],
    isAdmin:      true,
  },
  {
    username:     'busybobathan',
    description:  'Watches two movies a night, sleeps zero hours. Certified popcorn economist.',
    movieReviews: [1226863],
    isAdmin:      false,
  },
  {
    username:     'bubblebass',
    description:  'Here for the one-star reviews. Also they forgot the pickles.',
    movieReviews: [1226863],
    isAdmin:      false,
  },
];

export async function runSQL() {
  const client = new Client({
      host:     'userDB',
      port:     5400,
      database: 'postgres',
      user:     'postgres',
      password: 'admin',
    });
  try {
    console.log('Connecting...');
    await client.connect();
    console.log('Connected.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        "userID"       SERIAL PRIMARY KEY,
        username       VARCHAR(50)  NOT NULL UNIQUE,
        description    TEXT,
        "movieReviews" INTEGER[]    DEFAULT '{}',
        "isAdmin"      BOOLEAN      DEFAULT FALSE
      );
    `);

    console.log('Table ensured.');

    for (const user of users) {
      const result = await client.query(
        `INSERT INTO users (username, description, "movieReviews", "isAdmin")
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (username) DO NOTHING`,
        [user.username, user.description, user.movieReviews, user.isAdmin]
      );

      console.log(user.username, '-> inserted:', result.rowCount);
    }

    console.log('Seeder done.');
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await client.end();
  }
}