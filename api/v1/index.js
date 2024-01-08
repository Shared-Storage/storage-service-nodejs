const express = require("express");
const router = express.Router();

const locationRoute = require("./routes/location");
const itemRoute = require("./routes/item");

router.use("/location", locationRoute.router);
router.use("/item", itemRoute.router);

exports.router = router;
