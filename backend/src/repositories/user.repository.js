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
