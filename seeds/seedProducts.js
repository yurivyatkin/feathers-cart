/* eslint-disable no-console */
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb://localhost:27017/';
const dbName = 'feathers_cart';
const client = new MongoClient(mongoUrl, { useNewUrlParser: true });
const products = [
  {
    name: 'Sledgehammer',
    price: 125.76,
  },
  {
    name: 'Axe',
    price: 190.51,
  },
  {
    name: 'Bandsaw',
    price: 562.14,
  },
  {
    name: 'Chisel',
    price: 13.9,
  },
  {
    name: 'Hacksaw',
    price: 19.45,
  },
];
client.connect(err => {
  if (err) {
    console.error('Could not connect to Mongo', err);
    client.close();
    process.exit(1);
  }
  const db = client.db(dbName);
  const collection = db.collection('products');
  collection.insertMany(products, (err, results) => {
    if (err) {
      console.error('Could not insert documents', err);
      client.close();
      process.exit(1);
    }
    console.log('Inserted', results.ops.length, 'documents');
    client.close();
    process.exit(0);
  });
});
