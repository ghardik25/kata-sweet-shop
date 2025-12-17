const Sweet = require("../models/Sweet");

// Create sweet
const create = async (sweet) => {
  return await Sweet.create(sweet);
};

// List all sweets
const findAll = async () => {
  return await Sweet.find();
};

// Find sweet by id
const findById = async (id) => {
  return await Sweet.findById(id);
};

// Update quantity explicitly (used in inventory tests)
const updateQuantity = async (id, quantity) => {
  return await Sweet.findByIdAndUpdate(
    id,
    { quantity },
    { new: true }
  );
};

// Used only by tests
const clear = async () => {
  await Sweet.deleteMany({});
};

module.exports = {
  create,
  findAll,
  findById,
  updateQuantity,
  clear,
};
