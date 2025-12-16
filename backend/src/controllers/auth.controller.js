const registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  return res.status(201).json({
    message: "User registered successfully",
  });
};

module.exports = {
  registerUser,
};