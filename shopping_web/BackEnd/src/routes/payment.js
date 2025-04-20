const express = require("express");
const router = express.Router();
const PaymentService = require("../services/PaymentService");

router.post("/create_payment_url", PaymentService.createPaymentGateway);

module.exports = router;
