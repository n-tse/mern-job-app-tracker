const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

const connectDB = async() => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;