// Encapsulates business logic related to sweets.
// Currently simple, but easily extensible (pricing rules, stock checks).
const sweetsRepository = require("../repositories/sweets.repository");

function addSweet(data) {
  return sweetsRepository.create(data);
}

function listSweets() {
  return sweetsRepository.findAll();
}

function purchaseSweet(id) {
  const sweet = sweetsRepository.findById(id);
  if (!sweet || sweet.quantity <= 0) {
    throw { status: 400, message: "Out of stock" };
  }
  sweet.quantity -= 1;
  return sweet;
}

function restockSweet(id, qty) {
  const sweet = sweetsRepository.findById(id);
  if (!sweet) throw { status: 404, message: "Not found" };
  sweet.quantity += qty;
  return sweet;
}

module.exports = {
  addSweet,
  listSweets,
  purchaseSweet,
  restockSweet,
};
