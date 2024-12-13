const mongoose = require("mongoose");
const { statuses } = require("../validators/vehicle.validator");
console.log(statuses);

const VehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: statuses,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
