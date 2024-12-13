const express = require("express");
const vehicleController = require("../controllers/vehicle.controller");

const vehicleRouter = express.Router();

vehicleRouter.get("/", vehicleController.list);
vehicleRouter.get("/:id", vehicleController.detail);
vehicleRouter.post("/", vehicleController.create);
vehicleRouter.put("/:id", vehicleController.update);
vehicleRouter.delete("/:id", vehicleController.delete);

module.exports = vehicleRouter;
