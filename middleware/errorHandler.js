const errorHandler = (err, req, res, next) => {
  console.log("error occured with message : ", err);

  switch (true) {
    case typeof err === "string":
      const isNotFound = err.toLowerCase().endsWith("not found");
      const stsCode = isNotFound ? 404 : 400;
      return res.status(stsCode).json({ message: err });
      break;

    default:
      return res.status(500).json({ message: err.message });
      break;
  }
};

module.exports = errorHandler;
