require("dotenv").config();
const express = require("express");
const connectDB = require("./src/utiles/connectDB");
const vehicleRouter = require("./src/routes/vehicle.routes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/vehicles", vehicleRouter);

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found on our server" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const message = err.message;
  const stack = err.stack;
  res.status(500).send({ message, stack });
});

app.listen(
  process.env.PORT,
  console.log("Listening on port: ", process.env.PORT)
);
