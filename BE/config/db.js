const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/TaskieTechnologies');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

module.exports = connectToDatabase;
