const sweetsService = require("../services/sweets.service");

function createSweet(req, res) {
  sweetsService.addSweet(req.body);
  return res.status(201).json({ message: "Sweet added" });
}

function getSweets(req, res) {
  const sweets = sweetsService.listSweets();
  return res.status(200).json(sweets);
}

module.exports = {
  createSweet,
  getSweets,
};
