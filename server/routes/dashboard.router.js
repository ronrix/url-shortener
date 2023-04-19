const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/dashboard.controller");
const authenticateToken = require("../modules/middlewares/auth.middleware");

router.get("/dashboard", [authenticateToken], DashboardController.index);
router.get("/get-collections", [authenticateToken], DashboardController.getCollections);

router.post("/save-collection", [authenticateToken], DashboardController.saveCollection);
router.post("/edit-collection", [authenticateToken], DashboardController.editCollection);
router.get("/u/:id",  DashboardController.redirectToShortUrl);

module.exports = router;