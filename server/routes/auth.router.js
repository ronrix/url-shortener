const express = require("express");
const router = express.Router();

// controllers
const AuthController = require("../controllers/auth.controller.js");

// form routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;