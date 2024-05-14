const admin = require('firebase-admin');
const serviceAccount = require('../assets/eldercare-app-61fdb-firebase-adminsdk-hjpco-313d907387.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

// Path to your JSON file
const jsonFilePath = '../assets/csvjson.json';

// Read the JSON file
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

// Function to add data to Firestore
async function addDataToFirestore(collectionName, data) {
  const collectionRef = firestore.collection(collectionName);
  await Promise.all(data.map(async (doc) => {
    await collectionRef.add(doc);
  }));
  console.log('Data added to Firestore successfully.');
}

// Specify the collection name in Firestore
const collectionName = 'elderInfo';

// Call the function to add data to Firestore
addDataToFirestore(collectionName, jsonData);
