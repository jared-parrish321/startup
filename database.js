const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('calendars');
const daysCollection = db.collection('days');
const userCollection = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
  console.log('Succesfully connected to MongoDB Atlas');
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function updateDay(day, newData) {
  try {
    const query = { name: day };

    // Specify the new data to update or create the document
    const newDoc = {name: day, data: newData};

    // Use updateOne with upsert option to update or insert the document
    await daysCollection.replaceOne(query, newDoc);
    
  } catch (error) {
    console.error(`Error updating ${day} document:`, error);
  }
}
async function getDay(day) {
  try {
    const dayDocument = await daysCollection.findOne({ name: day });

    if (dayDocument) {
      return dayDocument.data;
    } else {
      console.log(`No document found for ${day}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching ${day} document:`, error);
    return null;
  }
}

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

module.exports = { 
  updateDay, 
  getDay,
  getUser,
  getUserByToken,
  createUser,
};