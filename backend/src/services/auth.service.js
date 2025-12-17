const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const JWT_SECRET = "test-secret"; // env later

async function registerUser({ name, email, password }) {
  if (!email || !password) {
    throw { status: 400, message: "Missing fields" };
  }

  const existingUser = userRepository.findByEmail(email);
  if (existingUser) {
    throw { status: 400, message: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return userRepository.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });
}

async function loginUser({ email, password }) {
  const user = userRepository.findByEmail(email);
  if (!user) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

module.exports = {
  registerUser,
  loginUser,
};