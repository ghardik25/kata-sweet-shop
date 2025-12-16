const registerUser = (req, res) => {
    return res.status(201).json({
    message: "User registered successfully",
    });
};

module.exports = {
  registerUser,
};