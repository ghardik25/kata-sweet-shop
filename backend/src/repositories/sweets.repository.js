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

module.exports = {
  create,
  findAll,
  clear,
};
