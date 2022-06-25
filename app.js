const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("./swagger.json");
const { PORT, connectDB } = require("./config");

// job for running expiration token
const nodeCron = require("node-cron");
const job = nodeCron.schedule("*/30 * * * *", function jpbExpirationToken() {
  console.log("jpbExpirationToken running on: ", new Date().toLocaleString());
})

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./src/routes"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use("/api/auth", require("./src/routes/users-auth"));

app.use("*", require("./src/routes/notfound"));

if (connectDB) {
  module.exports = app.listen(PORT, () => {
    console.log(`This app running on port ${PORT}`);
  });
}
