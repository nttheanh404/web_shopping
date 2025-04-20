const express = require("express");
const router = express.Router();
const emailController = require("../controllers/EmailController");

router.post("/subscribe", emailController.subscribeNewsletter);

module.exports = router;
