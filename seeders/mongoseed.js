import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb://admin:admin@localhost:27017/reviewdb?authSource=admin';


const reviews = [
  {
    userID: 0,
    movieID: '1226863',
    username: "grubolon_schmeeze",
    title: "A Thrilling Ride with One Stumble",
    content: "A genuinely gripping experience from start to finish. The cinematography is stunning and the lead performance carries every scene. My only gripe is that the third act feels a bit rushed — some emotional beats deserved more room to breathe. Still, a must-watch for fans of the genre.",
    rating: 8.5,
    thumbsUp: 142,
    thumbsDown: 18,
  },
  {
    userID: 1,
    movieID: '1226863',
    username: "busybobathan",
    title: "Decent but Didn't Quite Land",
    content: "Had high hopes going in but came out feeling a bit flat. The concept is original and the first half builds tension well, but the script loses its way once the plot kicks into high gear. Good for a casual Friday night, just don't expect anything too profound.",
    rating: 5.5,
    thumbsUp: 67,
    thumbsDown: 34,
  },
  {
    userID: 2,
    movieID: '1226863',
    username: "bubblebass",
    title: "Misleading Trailer, Disappointing Film",
    content: "I really wanted to like this. The trailer sold something completely different from what the film delivers. Pacing is painfully slow, dialogue feels unnatural, and the ending left me more confused than moved. Not one I'd recommend unless you're a die-hard completionist.",
    rating: 2.0,
    thumbsUp: 23,
    thumbsDown: 89,
  },
];

export async function runMongo() {
  var result;

  const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
  try {
    await client.connect();
    const myDB = client.db("reviewdb");
    const collections = await myDB.listCollections({ name: "reviews" }).toArray();
    if (collections.length === 0) {
      await myDB.createCollection("reviews");
    }
    const myColl = myDB.collection("reviews");
    result = await myColl.insertMany(reviews);
  } finally {
    await client.close();
    return result;
  }
}

runMongo()