const logger = require("./../../../util/logger");
const Item = require("./../model/item");

exports.create = async (req, res) => {
  // Validating incoming data
  const organizationId = req.body.organizationId;
  const locationId = req.body.locationId;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const tags = req.body.tags;

  const finalObject = {
    organizationId,
    locationId,
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
    const response = await Item.find();
    res.status(200).send({ items: response });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getByOrganizationId = async (req, res) => {
  const organizationId = req.params.organizationId;
  try {
    const response = await Item.find({ organizationId });
    res.status(200).send({
      items: response,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: true, errorMessage: err.message });
  }
};

exports.getByItemId = async (req, res) => {
  try {
    const response = await Item.findById(req.params.itemId);
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
  try{
    const response = await Item.findOneAndUpdate({ _id: itemId }, { ...data });
    res.status(200).send({ object: response });
  }
  catch(err) {
    logger.error(err)
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
