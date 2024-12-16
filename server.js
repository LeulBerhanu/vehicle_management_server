require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utiles/connectDB");
const vehicleRouter = require("./src/routes/vehicle.routes");

const app = express();

// connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/vehicles", vehicleRouter);

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found on our server" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error stack to the console
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

(async () => {
  try {
    await connectDB();
    app.listen(
      process.env.PORT,
      console.log("Listening on port:", process.env.PORT)
    );
  } catch (error) {
    console.error("Error during connection:", error);
  }
})();
