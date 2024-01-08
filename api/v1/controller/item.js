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
  
  exports.getByItemId = (req, res, next) => {
    res
      .status(200)
      .send({ working: "getByItemId", parameter: req.params.itemId });
  };
  
  exports.update = (req, res, next) => {
    res
      .status(200)
      .send({ working: "update", parameter: req.params.itemId });
  };
  
  
  exports.delete = (req, res, next) => {
    res.status(200).send({ working: "delete", parameter: req.params.itemId });
  };
  