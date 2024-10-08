const mongoose = require('mongoose');
const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DB,
    });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = { initMongoConnection };