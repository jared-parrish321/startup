const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const daysCollection = db.collection('days');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

async function insertDays() {
  for (const day of daysOfWeek) {
    await daysCollection.insertOne({ name: day });
  }
}

async function updateDay(day, newData) {
  const db = client.db('your_database_name'); // Replace with your database name
  const daysCollection = db.collection('days');

  try {
    const existingDay = await daysCollection.findOne({ name: day });

    if (!existingDay) {
      console.log(`No document found for ${day}`);
      return;
    }

    await daysCollection.replaceOne({ _id: existingDay._id }, newData);

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

// Call insertDays to insert documents
insertDays();
module.exports = { updateDay, getDay };