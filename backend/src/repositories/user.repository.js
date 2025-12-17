// In-memory repository used for fast testing and TDD.
// Will connect to MongoDB without changing services.
const users = [];

const findByEmail = (email) => {
  return users.find((user) => user.email === email);
};

const create = (user) => {
  users.push(user);
  return user;
};

const clearUsers = () => {
  users.length = 0;
};

module.exports = {
  findByEmail,
  create,
  clearUsers,
};
