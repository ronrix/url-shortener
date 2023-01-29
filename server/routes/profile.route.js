const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile.controller");
const authenthicateToken = require("../modules/middlewares/auth.middleware");

router.post("/update-profile", [authenthicateToken], ProfileController.edit);

module.exports = router;