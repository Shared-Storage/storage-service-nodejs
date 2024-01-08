const logger = require("./../../../util/logger");
// const Product = require("./../model/product");

exports.create = (req, res, next) => {
  res.status(200).send({ working: "create" });
};

exports.getAll = (req, res, next) => {
  res.status(200).send({ working: "getAll" });
};

exports.getByOrganizationId = (req, res, next) => {
  res
    .status(200)
    .send({
      working: "getByOrganizationId",
      parameter: req.params.organizationId,
    });
};

exports.getByLocationId = (req, res, next) => {
  res
    .status(200)
    .send({ working: "getByLocationId", parameter: req.params.locationId });
};

exports.getByLocationId = (req, res, next) => {
  res
    .status(200)
    .send({ working: "getByLocationId", parameter: req.params.locationId });
};

exports.delete = (req, res, next) => {
  res.status(200).send({ working: "delete", parameter: req.params.locationId });
};
