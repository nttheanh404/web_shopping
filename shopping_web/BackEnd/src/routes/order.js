const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const verifyToken = require("../middleware/verifyToken");

router.post("/order", verifyToken, orderController.createOrder);
router.get("/order", verifyToken, orderController.getAllOrders);
router.get(
  "/order/user/:user_id",
  verifyToken,
  orderController.getOrdersByUserId
);
router.get("/order/:id", verifyToken, orderController.getOrderById);
router.put("/order/:id", verifyToken, orderController.updatePaymentStatus);
router.put("/order/status/:id", verifyToken, orderController.updateOrderStatus);
router.get("/order/revenue/get", orderController.getRevenue);

module.exports = router;
