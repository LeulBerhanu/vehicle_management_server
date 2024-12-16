const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/Vehicle.model");
const {
  validateVehicle,
  statuses,
} = require("../validators/vehicle.validator");
const { isValidObjectId } = require("mongoose");

const vehicleController = {
  list: asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, filter, sort } = req.query;

    const query = {};
    if (filter) {
      query.$or = [
        { name: { $regex: filter, $options: "i" } },
        { status: { $regex: filter, $options: "i" } },
      ];
    }

    const currentPage = Math.max(1, parseInt(page));
    const pageSize = Math.max(1, parseInt(limit));

    const sortObj = {};
    if (sort && sort.length > 0) {
      sort.forEach(({ id: sortField, desc }) => {
        if (sortField) {
          sortObj[sortField] = JSON.parse(desc) ? -1 : 1;
        }
      });
    }

    const vehicles = await Vehicle.find(query)
      .sort(sortObj)
      .skip(page * limit)
      .limit(limit);

    const totalItems = await Vehicle.countDocuments(query);

    res.status(200).json({
      message: "Vehicles fetched successfully.",
      vehicles,
      pagination: {
        currentPage,
        pageSize,
        limit,
        totalItems,
      },
    });
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

    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, data, {
      new: true,
    });
    if (!vehicle) throw new Error("Vehicle not found");

    res.status(200).json({ message: "Vehicle updated successfully", vehicle });
  }),

  delete: asyncHandler(async (req, res) => {
    const vehicleId = req.params.id;
    if (!isValidObjectId(vehicleId)) throw new Error("Id not valid");

    const vehicleFound = await Vehicle.findByIdAndDelete(vehicleId);
    if (!vehicleFound) throw new Error("Vehicle not found");

    res.status(200).json({ message: "Vehicle deleted successfully" });
  }),

  deleteMany: asyncHandler(async (req, res) => {
    const vehicleIds = req.body;

    vehicleIds.forEach((id) => {
      if (!isValidObjectId(id)) throw new Error("Id not valid");
    });

    const deletedVehicles = await Vehicle.deleteMany({
      _id: { $in: vehicleIds },
    });

    res.status(200).json({
      message: `${deletedVehicles.deletedCount} vehicles deleted successfully`,
    });
  }),
};

module.exports = vehicleController;
