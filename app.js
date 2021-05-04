const express = require("express");
const bodyParser = require("body-parser");

const { PORT, connectDB } = require("./config");
const { errorHandler } = require("./middleware");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//list of main routes
app.use("/", require("./src/routes"));

app.use(errorHandler);

if (connectDB) {
  app.listen(PORT, () => {
    console.log(`This app running on port ${PORT}`);
  });
}
