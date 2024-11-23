const notFoundHandler = (req, res) => {
  res.status(400).json({ message: "Not Found" });
};

module.exports = notFoundHandler;
