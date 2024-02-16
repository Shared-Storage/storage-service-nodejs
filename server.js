const app = require("./app");

const PORT = process.env.SERVER_PORT || 8080;
const ENV = process.env.ENV;
const ENABLE_DEBUG = process.env.ENABLE_DEBUG;

app.listen(PORT, () => {
  console.group("Environment details");
  console.table({
    Environment: ENV,
    "Debugging enabled": ENABLE_DEBUG,
    Port: PORT,
  });
  console.groupEnd();
});
