const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

router.post("/auth/signup", authController.handleRegister);
router.post("/auth/login", authController.handleLogin);
// router.post("/auth/refresh", authController.handleRefresh);
router.post("/auth/logout", authController.handleLogout);
router.post("/auth/change-password", authController.handleChangePassword);
router.get("/auth/verify-email", authController.handleVerifyEmail);

module.exports = router;
