const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("./swagger.json");
const { errorNotFoundHandle, errorInternalHandle } = require("./helpers")
const { PORT, connectDB } = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./src/routes"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use("/api/auth", require("./src/routes/users-auth"));
app.use("/api/token", require("./src/routes/token"));
app.use(
  "/api/admin", 
  require("./src/routes/event-pics"), 
  require("./src/routes/event-types")
);

// Not found handle
app.get('*', function(req, res) {
  return errorNotFoundHandle(req, res);
});

// Error internal handle
app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called");
  console.log('Path: ', req.path);

  return errorInternalHandle(req, res, error);
})

if (connectDB) {
  module.exports = app.listen(PORT, () => {
    console.log(`This app running on port ${PORT}`);
  });
}
