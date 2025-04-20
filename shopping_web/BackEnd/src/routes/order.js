const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/order", orderController.createOrder);
router.get("/order", orderController.getAllOrders);
router.get("/order/user/:user_id", orderController.getOrdersByUserId);
router.get("/order/:id", orderController.getOrderById);
router.put("/order/:id", orderController.updatePaymentStatus);
router.put("/order/status/:id", orderController.updateOrderStatus);
router.get("/order/revenue/get", orderController.getRevenue);

module.exports = router;
