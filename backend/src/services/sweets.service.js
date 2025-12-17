// Encapsulates business logic related to sweets.
// Currently simple, but easily extensible (pricing rules, stock checks).
const sweetsRepository = require("../repositories/sweets.repository");

function addSweet(data) {
  return sweetsRepository.create(data);
}

function listSweets() {
  return sweetsRepository.findAll();
}

module.exports = { addSweet, listSweets };
