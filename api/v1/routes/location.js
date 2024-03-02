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
const isAuth = require("../controller/isAuth");

const fileStorage = multerS3({
  s3: s3,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  bucket: process.env.MULTER_S3_BUCKET,
  // acl: "public-read", // not using it anymore because giving access to S3 by vrating user and assigning user to group with policy.
  key: function (_req, file, cb) {
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

const fileFilter = (_req, _file, cb) => {
  return cb(null, true);
};

var upload = multer({ storage: fileStorage, fileFilter: fileFilter });
const router = express.Router();

router.post(
  "/location-image-upload",
  isAuth,
  upload.single("file"),
  controller.imageUpload
);

// Create location
router.post("/", isAuth, controller.create);
// Get all locations
router.get("/", isAuth, controller.getAll);
// Get locations by organization
router.get("/org/:organizationId", isAuth, controller.getByOrganizationId);
// Get location by location id
router.get("/loc/:locationId", isAuth, controller.getByLocationId);
// Delete location by location id
router.delete("/:locationId", isAuth, controller.delete);

exports.router = router;
