require("dotenv").config();
const express = require("express");
const connectDB = require("./src/utiles/connectDB");

const app = express();

connectDB();

app.listen(
  process.env.PORT,
  console.log("Listening on port: ", process.env.PORT)
);
