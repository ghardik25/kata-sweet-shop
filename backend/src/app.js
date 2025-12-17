const express = require("express");
const authController = require("./controllers/auth.controller");
const sweetsController = require("./controllers/sweets.controller");
const authenticate = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());

// auth
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

// sweets (protected)
app.post("/api/sweets", authenticate, sweetsController.createSweet);
app.get("/api/sweets", authenticate, sweetsController.getSweets);
app.post("/api/sweets/:id/purchase", authenticate, sweetsController.purchase);
app.post("/api/sweets/:id/restock", authenticate, sweetsController.restock);

module.exports = app;
