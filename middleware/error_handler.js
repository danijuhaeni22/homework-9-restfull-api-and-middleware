const errorHandler = (err, req, res, next) => {
  if (err.name === "notFound") {
    res.status(404).json({ message: "Data tidak ditemukan" });
  }
};

module.exports = errorHandler;
