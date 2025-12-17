const users = [];

const findByEmail = async (email) => {
  return users.find((user) => user.email === email);
};

const createUser = async (user) => {
  users.push(user);
  return user;
};

const clearUsers = () => {
  users.length = 0;
};

module.exports = {
  findByEmail,
  createUser,
  clearUsers,
};
