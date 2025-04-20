const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const emailRoutes = require("./email");
const productRoutes = require("./product");
const uploadRoutes = require("./upload");
const orderRoutes = require("./order");
// const paymentRoutes = require("./payment");

router.use(authRoutes);
router.use(emailRoutes);
router.use(productRoutes);
router.use(uploadRoutes);
// router.use(orderRoutes);
// router.use(paymentRoutes);

module.exports = router;
