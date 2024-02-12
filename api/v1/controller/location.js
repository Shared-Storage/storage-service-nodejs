const logger = require("./../../../util/logger");
const Location = require("./../model/location");

exports.create = async (req, res) => {
  // Validating incoming data
  const organizationId = req.body.organizationId;
  const name = req.body.name;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const finalObj = { organizationId, name, description, imageUrl };
  try {
    const locationObject = new Location({ ...finalObj });
    const response = await locationObject.save();
    res.status(201).send({ object: response });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const response = await Location.find();
    res.status(200).send({ locations: response });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getByOrganizationId = async (req, res) => {
  try {
    const response = await Location.find().where({
      organizationId: req.params.organizationId,
    });
    res.status(200).send({ locations: response });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getByLocationId = async (req, res) => {
  try {
    const response = await Location.findById(req.params.locationId);
    res.status(200).send({ location: response });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const response = await Location.deleteOne({ _id: req.params.locationId });
    res.status(200).send({ deleted: response.acknowledged });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.imageUpload = (req, res, next) => {
  const data = {
    filename: req.file.key,
    fileLocation: req.file.location,
    originalname: req.file.originalname,
  };
  res.status(200).json({ success: true, data: data });
};
