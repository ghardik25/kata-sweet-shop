const express = require("express");
const authController = require("./controllers/auth.controller");

const app = express();
app.use(express.json());

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

module.exports = app;
