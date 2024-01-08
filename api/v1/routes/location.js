const express = require("express");
const controller = require("./../controller/location");

const router = express.Router();

// Create location
router.post("/", controller.create);
// Get all locations
router.get("/", controller.getAll);
// Get locations by organization
router.get("/org/:organizationId", controller.getByOrganizationId);
// Get location by location id
router.get("/loc/:locationId", controller.getByLocationId);
// Delete location by location id
router.delete("/:locationId", controller.delete);

exports.router = router;