const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const emailRoutes = require("./email");
const productRoutes = require("./product");
const uploadRoutes = require("./upload");
const orderRoutes = require("./order");
const paymentRoutes = require("./payment");
const chatRoutes = require("./chat");
const reviewRoutes = require("./review");
const statsRoutes = require("./stats");

router.use(authRoutes);
router.use(emailRoutes);
router.use(productRoutes);
router.use(uploadRoutes);
router.use(orderRoutes);
router.use(paymentRoutes);
router.use(chatRoutes);
router.use(reviewRoutes);
router.use(statsRoutes);

module.exports = router;
