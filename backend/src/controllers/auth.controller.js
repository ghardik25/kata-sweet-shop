const { validateRegisterInput } = require("../validators/auth.validator");
const authService = require("../services/auth.service");

const registerUser = async (req, res) => {
  const error = validateRegisterInput(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    await authService.register(req.body);

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
};
