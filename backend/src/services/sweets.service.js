const sweetsRepository = require("../repositories/sweets.repository");

// Add a new sweet
async function addSweet(data) {
  return await sweetsRepository.create(data);
}

// List all sweets
async function listSweets() {
  return await sweetsRepository.findAll();
}

// Purchase a sweet (decrease quantity)
async function purchaseSweet(id) {
  const sweet = await sweetsRepository.findById(id);

  if (!sweet) {
    throw { status: 404, message: "Sweet not found" };
  }

  if (sweet.quantity <= 0) {
    throw { status: 400, message: "Out of stock" };
  }

  sweet.quantity -= 1;
  await sweet.save();
}

// Restock a sweet
async function restockSweet(id, quantity) {
  const sweet = await sweetsRepository.findById(id);

  if (!sweet) {
    throw { status: 404, message: "Sweet not found" };
  }

  if (!quantity || quantity <= 0) {
    throw { status: 400, message: "Invalid quantity" };
  }

  sweet.quantity += quantity;
  await sweet.save();
}

module.exports = {
  addSweet,
  listSweets,
  purchaseSweet,
  restockSweet,
};
