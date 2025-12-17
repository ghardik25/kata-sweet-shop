// In-memory repository used for fast testing and TDD.
// Will connect to MongoDB without changing services.
let sweets = [];
let idCounter = 1;

const create = (sweet) => {
  const newSweet = { id: idCounter++, ...sweet };
  sweets.push(newSweet);
  return newSweet;
};

const findAll = () => sweets;

const clear = () => {
  sweets = [];
  idCounter = 1;
};

const findById = (id) => sweets.find((s) => s.id === Number(id));

const updateQuantity = (id, quantity) => {
  const sweet = findById(id);
  if (sweet) sweet.quantity = quantity;
  return sweet;
};

module.exports = {
  create,
  findAll,
  clear,
  findById,
  updateQuantity
};
