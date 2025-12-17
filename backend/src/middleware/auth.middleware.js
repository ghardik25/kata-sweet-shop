// Responsible for authenticating requests using JWT.
// Keeps controllers clean, enforces stateless auth.
const jwt = require("jsonwebtoken");

const JWT_SECRET = "test-secret";

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  // Require Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Decode and attach user context to request
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authenticate;
