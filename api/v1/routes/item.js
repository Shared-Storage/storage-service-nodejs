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
    var fullPath = "images/items/" + newFileName;
    cb(null, fullPath);
  },
});

const fileFilter = (_req, _file, cb) => {
  return cb(null, true);
};

var upload = multer({ storage: fileStorage, fileFilter: fileFilter });
const router = express.Router();

router.post(
  "/item-image-upload",
  isAuth,
  upload.single("file"),
  controller.imageUpload
);

// Create item
router.post("/", isAuth, controller.create);
// Get all items
router.get("/", isAuth, controller.getAll);
// Get items by organization
router.get("/org/:organizationId", isAuth, controller.getByOrganizationId);
// Get items by organization by location
router.get(
  "/org-loc/:organizationId/:locationId",
  isAuth,
  controller.getByOrganizationIdByLocationId
);
// Get items by organization by search
router.get(
  "/org-search/:organizationId/:searchText",
  isAuth,
  controller.getByOrganizationIdBySearchText
);
// Get items by organization by location by search
router.get(
  "/org-location-search/:organizationId/:locationId/:searchText",
  isAuth,
  controller.getByOrganizationIdByLocationIdBySearchText
);
// Get item by item id
router.get("/item-id/:itemId", isAuth, controller.getByItemId);
// Update item by item id
router.put("/:itemId", isAuth, controller.update);
// Delete location by location id
router.delete("/:itemId", isAuth, controller.delete);

exports.router = router;
