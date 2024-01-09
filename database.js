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
    const existingDay = await daysCollection.findOne({ name: day });

    if (existingDay){
      await daysCollection.update( 
        { _id: existingDay._id }, 
        { data: newData }, 
        { upsert: true }
      );
    } else {
        try {
          await daysCollection.insertOne({ name: day }, { data : newData });
        } catch (insertError) {
          console.error(`Error inserting ${day} document:`, insertError);
        }
      }
    
  } catch (error) {
    console.error(`Error updating ${day} document:`, error);
  }
}
async function getDay(day) {
  try {
    const dayDocument = await daysCollection.findOne({ name: day });

    if (dayDocument) {
      return dayDocument;
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