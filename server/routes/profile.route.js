const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile.controller");
const authenthicateToken = require("../modules/middlewares/auth.middleware");

router.post("/update-profile", [authenthicateToken], ProfileController.edit);
router.post("/update-password", [authenthicateToken], ProfileController.updatePassword);

module.exports = router;