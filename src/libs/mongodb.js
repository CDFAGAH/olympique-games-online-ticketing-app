import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent multiple connections
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = client.connect();
    global._mongoClientPromise = clientPromise;
  }
} else {
  // In production mode, use a regular variable
  clientPromise = client.connect();
}

export default clientPromise;
