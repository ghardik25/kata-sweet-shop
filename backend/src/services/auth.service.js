// Handles core authentication business rules.
// This layer is independent of HTTP and persistence details.
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const JWT_SECRET = "test-secret"; // kept simple for kata/testing

async function registerUser({ name, email, password }) {
  if (!email || !password) {
    throw { status: 400, message: "Missing fields" };
  }

  // Prevent duplicate account
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw { status: 400, message: "Email already exists" };
  }

// Hash password before persistence (security requirement)
  const hashedPassword = await bcrypt.hash(password, 10);

  return await userRepository.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });
}

async function loginUser({ email, password }) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw { status: 401, message: "Invalid credentials" };
  }

  // Compare plain password with stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: "Invalid credentials" };
  }

  // Generate JWT for stateless authentication
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
}

module.exports = { registerUser, loginUser };
