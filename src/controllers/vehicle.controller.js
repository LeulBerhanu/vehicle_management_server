const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/Vehicle.model");
const { validateVehicle } = require("../validators/vehicle.validator");
const { isValidObjectId } = require("mongoose");

const vehicleController = {
  list: asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find();
    res
      .status(200)
      .json({ message: "Vehicles fetched successfully.", vehicles });
  }),

  detail: asyncHandler(async (req, res) => {
    const vehicleId = req.params.id;
    if (!isValidObjectId(vehicleId)) throw new Error("Id is not valid");

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");

    res.status(200).json({ message: "Vehicle fetched successfully.", vehicle });
  }),

  create: asyncHandler(async (req, res) => {
    const { success, data, error } = validateVehicle(req.body);

    if (!success) {
      return res.status(400).json({ message: "Validation failed!", error });
    }

    const vehicle = await Vehicle.create(data);
    res.status(201).json({ message: "Vehicle created successfully.", vehicle });
  }),

  update: asyncHandler(async (req, res) => {
    const vehicleId = req.params.id;
    if (!isValidObjectId(vehicleId)) throw new Error("Id is not valid");

    const { success, data, error } = validateVehicle(req.body);
    if (!success) {
      return res.status(400).json({ message: "Validation failed!", error });
    }

    const vehicleUpdated = await Vehicle.findByIdAndUpdate(vehicleId, data, {
      new: true,
    });
    if (!vehicleUpdated) throw new Error("Vehicle not found");

    res
      .status(200)
      .json({ message: "Vehicle updated successfully", vehicleUpdated });
  }),

  delete: asyncHandler(async (req, res) => {
    const vehicleId = req.params.id;
    if (!isValidObjectId(vehicleId)) throw new Error("Id not valid");

    const vehicleFound = await Vehicle.findByIdAndDelete(vehicleId);
    if (!vehicleFound) throw new Error("Vehicle not found");

    res.status(200).json({ message: "Vehicle deleted successfully" });
  }),
};

module.exports = vehicleController;
