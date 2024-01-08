const express = require("express");
const controller = require("./../controller/item");

const router = express.Router();

// Create item
router.post("/", controller.create);
// Get all items
router.get("/", controller.getAll);
// Get items by organization
router.get("/org/:organizationId", controller.getByOrganizationId);
// Get item by item id
router.get("/item-id/:itemId", controller.getByItemId);
// Update item by item id
router.put("/:itemId", controller.update);
// Delete location by location id
router.delete("/:itemId", controller.delete);

exports.router = router;