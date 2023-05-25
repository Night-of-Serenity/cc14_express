exports.notFound = (req, res) => {
  res.status(404).send({ msg: "resources not found" });
};
