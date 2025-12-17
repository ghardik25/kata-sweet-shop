const authService = require("../services/auth.service");

async function register(req, res) {
  try {
    await authService.registerUser(req.body);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const token = await authService.loginUser(req.body);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = { register, login };
