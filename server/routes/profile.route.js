const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const ProfileController = require("../controllers/profile.controller");
const authenthicateToken = require("../modules/middlewares/auth.middleware");

router.post("/update-profile", [authenthicateToken], ProfileController.edit);
router.post("/update-password", [authenthicateToken], ProfileController.updatePassword);
router.post("/upload-avatar", [authenthicateToken, upload.single("avatar")], ProfileController.avatar);
router.get("/set-avatar-to-default", [authenthicateToken], ProfileController.setAvatarBackToDefault);

module.exports = router;