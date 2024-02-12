const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: process.env.CLOUD_SECRET_KEY,
  accessKeyId: process.env.CLOUD_ACCESS_KEY_ID,
});
var s3 = new aws.S3();

const controller = require("./../controller/location");

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
    var fullPath = "images/locations/" + newFileName;
    cb(null, fullPath);
  },
});

const fileFilter = (req, file, cb) => {
  return cb(null, true);
};

var upload = multer({ storage: fileStorage, fileFilter: fileFilter });
const router = express.Router();

router.post(
  "/location-image-upload",
  upload.single("file"),
  controller.imageUpload
);

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
