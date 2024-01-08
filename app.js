const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const logger = require("./util/logger");
const v0Routes = require("./api/v0/index");
const v1Routes = require("./api/v1/index");

const SERVER_PORT = process.env.SERVER_PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Authorization,Accept"
  );
  next();
});

app.use(express.static("./public"));

app.use((req, _res, next) => {
  logger.log(`REQUEST URL: ${req.url} METHOD: ${req.method}`);
  next();
});
app.use("/v0", v0Routes.router);
app.use("/v1", v1Routes.router);
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(process.env.SERVER_PORT, (err) => {
      if (!err) console.log(`Listening to port ${SERVER_PORT}...`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
