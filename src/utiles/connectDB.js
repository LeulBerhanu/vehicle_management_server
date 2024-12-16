const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to database ...");
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.log(`Error connecting to Mongodb`, error);
    process.exit(1);
  }
};

module.exports = connectDB;
