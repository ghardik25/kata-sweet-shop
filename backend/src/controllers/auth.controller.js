const { validateRegisterInput } = require("../validators/auth.validator");

const registerUser = (req, res) => {
    const error = validateRegisterInput(req.body);
    
    if (error) {
        return res.status(400).json({ message: error });
    }
    
    return res.status(201).json({
        message: "User registered successfully",
    });
};

module.exports = {
  registerUser,
};
