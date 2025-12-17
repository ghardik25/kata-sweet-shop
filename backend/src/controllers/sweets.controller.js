const sweetsService = require("../services/sweets.service");

// Create a new sweet
function createSweet(req, res) {
  sweetsService.addSweet(req.body);
  return res.status(201).json({ message: "Sweet added" });
}

// List all sweets
function getSweets(req, res) {
  const sweets = sweetsService.listSweets();
  return res.status(200).json(sweets);
}

// Purchase a sweet (decrease quantity)
function purchase(req, res) {
  try {
    sweetsService.purchaseSweet(req.params.id);
    return res.status(200).json({ message: "Purchased" });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

// Restock a sweet (admin only check is in controller)
function restock(req, res) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    sweetsService.restockSweet(req.params.id, req.body.quantity);
    return res.status(200).json({ message: "Restocked" });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = {
  createSweet,
  getSweets,
  purchase,
  restock,
};
