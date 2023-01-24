const express = require("express");
const router = express.Router();

// controllers
const AuthController = require("../controllers/auth.controller.js");
const authenticateToken = require("../modules/middlewares/auth.middleware.js");

// form routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/google-auth", AuthController.googleAuth);

router.get("/check-auth", [authenticateToken], AuthController.isAuthenticated);
router.get("/signout", [authenticateToken], AuthController.signOut);

module.exports = router;