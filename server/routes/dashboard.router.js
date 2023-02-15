const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/dashboard.controller");
const authenticateToken = require("../modules/middlewares/auth.middleware");

router.get("/dashboard", [authenticateToken], DashboardController.index);
router.get("/get-collections", [authenticateToken], DashboardController.getCollections);

router.post("/save-collection", [authenticateToken], DashboardController.saveCollection);
router.get("/u/:string", [authenticateToken], DashboardController.goShort);

module.exports = router;