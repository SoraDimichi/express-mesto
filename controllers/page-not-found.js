const getPageNotFound = (req, res) => {
  return res.status(404).send({ "message" : "Запрашиваемый ресурс не найден" });
};

module.exports = { getPageNotFound };
