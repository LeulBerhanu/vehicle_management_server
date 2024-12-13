const { z } = require("zod");

const statuses = ["Available", "Unavailable", "In Service", "Out of Service"];

const VehicleZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(statuses),
});

module.exports = {
  VehicleZodSchema,
  validateVehicle: (data) => {
    return VehicleZodSchema.safeParse(data);
  },
  statuses,
};
