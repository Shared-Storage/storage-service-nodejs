const logger = require("./../../../util/logger");
const Item = require("./../model/item");

exports.create = async (req, res) => {
  // Validating incoming data
  const organizationId = req.body.organizationId;
  const location = req.body.locationId;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const tags = req.body.tags;

  const finalObject = {
    organizationId,
    location,
    name,
    imageUrl,
    description,
    tags,
  };

  try {
    const itemObject = new Item({ ...finalObject });
    const response = await itemObject.save();
    res.status(201).send({ object: response });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const response = await Item.find().populate("location");
    res.status(200).send({ items: response });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getByOrganizationId = async (req, res) => {
  const organizationId = req.params.organizationId;
  try {
    const response = await Item.find({ organizationId }).populate("location");
    res.status(200).send({
      items: response,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getByOrganizationIdByLocationId = async (req, res) => {
  const organizationId = req.params.organizationId;
  const location = req.params.locationId;
  try {
    const response = await Item.find({ organizationId, location }).populate(
      "location"
    );
    res.status(200).send({
      items: response,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getByOrganizationIdBySearchText = async (req, res) => {
  const organizationId = req.params.organizationId;
  const searchText = req.params.searchText;
  try {
    const response = await Item.find({
      organizationId,
      $text: { $search: searchText },
    }).populate("location");
    res.status(200).send({
      items: response,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: true, errorMessage: error.message });
  }
};

exports.getByOrganizationIdByLocationIdBySearchText = async (req, res) => {
  const organizationId = req.params.organizationId;
  const location = req.params.locationId;
  const searchText = req.params.searchText;
  try {
    const response = await Item.find({
      organizationId,
      location,
      $text: { $search: searchText },
    }).populate("location");
    res.status(200).send({
      items: response,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: true, errorMessage: error.message });
  }
};

exports.getByItemId = async (req, res) => {
  try {
    const response = await Item.findById(req.params.itemId).populate(
      "location"
    );
    res.status(200).send({
      items: response,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.update = async (req, res) => {
  const itemId = req.params.itemId;
  const data = req.body;
  try {
    const response = await Item.findOneAndUpdate({ _id: itemId }, { ...data });
    res.status(200).send({ object: response });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const response = await Item.deleteOne({ _id: req.params.itemId });
    res.status(200).send({ deleted: response.acknowledged });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.imageUpload = (req, res) => {
  const data = {
    filename: req.file.key,
    fileLocation: req.file.location,
    originalname: req.file.originalname,
  };
  res.status(200).json({ success: true, data: data });
};
