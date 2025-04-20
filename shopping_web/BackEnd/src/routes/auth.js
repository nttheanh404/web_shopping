const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

router.post("/auth/signup", authController.handleRegister);
router.post("/auth/login", authController.handleLogin);
// router.post("/auth/refresh", authController.handleRefresh);
router.post("/auth/logout", authController.handleLogout);

module.exports = router;
