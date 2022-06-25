const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to teman-ngopi api",
  });
});

module.exports = router;
