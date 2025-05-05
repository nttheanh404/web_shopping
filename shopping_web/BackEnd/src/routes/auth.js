const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const verifyToken = require("../middleware/verifyToken");

router.post("/auth/signup", authController.handleRegister);
router.post("/auth/login", authController.handleLogin);
// router.post("/auth/refresh", authController.handleRefresh);
router.post("/auth/logout", authController.handleLogout);
router.post(
  "/auth/change-password",
  verifyToken,
  authController.handleChangePassword
);
router.get("/auth/verify-email", authController.handleVerifyEmail);
router.get("/auth/accounts", authController.getAllAccounts);
router.put("/auth/update/:id", authController.updateAccount);

module.exports = router;
