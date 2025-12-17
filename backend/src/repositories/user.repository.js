const User = require("../models/User");

// Find user by email (used for auth)
const findByEmail = async (email) => {
  return await User.findOne({ email });
};

// Create new user
const create = async (user) => {
  return await User.create(user);
};

// Used only by tests
const clearUsers = async () => {
  await User.deleteMany({});
};

module.exports = {
  findByEmail,
  create,
  clearUsers,
};
