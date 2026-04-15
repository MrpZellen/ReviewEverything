import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host:     'localhost',
  port:     5432,
  database: 'postgres',
  user:     'postgres',
  password: 'admin',
});

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
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        "userID"       SERIAL PRIMARY KEY,
        username       VARCHAR(50)  NOT NULL UNIQUE,
        description    TEXT,
        "movieReviews" INTEGER[]    DEFAULT '{}',
        "isAdmin"      BOOLEAN      DEFAULT FALSE
      );
    `);

    for (const user of users) {
      await client.query(
        `INSERT INTO users (username, description, "movieReviews", "isAdmin")
         VALUES ($1, $2, $3, $4)`,
        [user.username, user.description, user.movieReviews, user.isAdmin]
      );
    }

    console.log('User seeder complete.');
  } finally {
    await client.end();
  }
}

runSQL()