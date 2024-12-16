require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./src/utiles/connectDB");
const Vehicle = require("./src/models/Vehicle.model");
const MOCK_DATA = require("./MOCK_DATA.json");

(async () => {
  try {
    await connectDB();
    console.log("Seeding ...");
    await seedDatabase();
    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    mongoose.connection.close();
  }
})();

const seedData = MOCK_DATA;

async function seedDatabase() {
  try {
    console.log("> Clearing database ...");
    await Vehicle.deleteMany({});

    console.log("> Inserting data ...");
    const result = await Vehicle.insertMany(seedData);

    console.log(`> ${result.length} items were successfully inserted.`);
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}
