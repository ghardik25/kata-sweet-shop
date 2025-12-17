const sweetsService = require("../services/sweets.service");

// Create a new sweet
async function createSweet(req, res) {
  const sweet = await sweetsService.addSweet(req.body);
  return res.status(201).json(sweet);
}

// List all sweets
async function getSweets(req, res) {
  const sweets = await sweetsService.listSweets();
  return res.status(200).json(sweets);
}

// Purchase a sweet (decrease quantity)
async function purchase(req, res) {
  try {
    await sweetsService.purchaseSweet(req.params.id);
    return res.status(200).json({ message: "Purchased" });
  } catch (err) {
    console.error(err); // <-- important for async rejection safety
    return res.status(err.status ?? 500).json({
      message: err.message ?? "Internal Server Error",
    });
  }
}

// Restock a sweet (admin only)
async function restock(req, res) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    await sweetsService.restockSweet(req.params.id, req.body.quantity);
    return res.status(200).json({ message: "Restocked" });
  } catch (err) {
    console.error(err);
    return res.status(err.status ?? 500).json({
      message: err.message ?? "Internal Server Error",
    });
  }
}

module.exports = {
  createSweet,
  getSweets,
  purchase,
  restock,
};
