const express = require("express");
const router = express.Router();

// controllers
const AuthController = require("../controllers/auth.controller.js");

// form routes
router.post("/login", AuthController.login);

module.exports = router;