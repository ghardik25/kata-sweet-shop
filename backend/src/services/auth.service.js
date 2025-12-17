const userRepository = require("../repositories/user.repository");

const register = async ({ email, password }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  return userRepository.createUser({ email, password });
};

module.exports = {
  register,
};
