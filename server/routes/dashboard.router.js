const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/dashboard.controller");
const authenticateToken = require("../modules/middlewares/auth.middleware");

router.get("/dashboard", [authenticateToken], DashboardController.index);
router.get("/get-collections", [authenticateToken], DashboardController.getCollections);
router.get("/generate-short-url", [authenticateToken], DashboardController.generatShortString);

module.exports = router;