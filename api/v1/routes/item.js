const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: process.env.CLOUD_SECRET_KEY,
  accessKeyId: process.env.CLOUD_ACCESS_KEY_ID,
});
var s3 = new aws.S3();

const controller = require("./../controller/item");

const fileStorage = multerS3({
  s3: s3,
  bucket: process.env.MULTER_S3_BUCKET,
  // acl: "public-read", // not using it anymore because giving access to S3 by vrating user and assigning user to group with policy.
  key: function (req, file, cb) {
    var newFileName =
      new Date().toDateString() +
      "-" +
      new Date().getTime() +
      "-" +
      file.originalname;
    var fullPath = "images/items/" + newFileName;
    cb(null, fullPath);
  },
});

const fileFilter = (req, file, cb) => {
  return cb(null, true);
};

var upload = multer({ storage: fileStorage, fileFilter: fileFilter });
const router = express.Router();

router.post(
  "/item-image-upload",
  upload.single("file"),
  controller.imageUpload
);


// Create item
router.post("/", controller.create);
// Get all items
router.get("/", controller.getAll);
// Get items by organization
router.get("/org/:organizationId", controller.getByOrganizationId);
// Get items by organization by location
router.get(
  "/org-loc/:organizationId/:locationId",
  controller.getByOrganizationIdByLocationId
);
// Get items by organization by search
router.get(
  "/org-search/:organizationId/:searchText",
  controller.getByOrganizationIdBySearchText
);
// Get items by organization by location by search
router.get(
  "/org-location-search/:organizationId/:locationId/:searchText",
  controller.getByOrganizationIdByLocationIdBySearchText
);
// Get item by item id
router.get("/item-id/:itemId", controller.getByItemId);
// Update item by item id
router.put("/:itemId", controller.update);
// Delete location by location id
router.delete("/:itemId", controller.delete);

exports.router = router;
