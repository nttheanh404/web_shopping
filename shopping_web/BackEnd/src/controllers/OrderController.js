const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const newOrder = await OrderService.createOrder(req);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order", details: err });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await OrderService.getOrdersByUserId(req.params.user_id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const updated = await OrderService.updateOrder(id, updateData);
    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order", details: err });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const { status } = req.body;

    const updatedOrder = await OrderService.updateOrder(id, {
      payment_status: status,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update order status", details: err });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const { status } = req.body;

    const updatedOrder = await OrderService.updateOrder(id, {
      order_status: status,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update order status", details: err });
  }
};

const getRevenue = async (req, res) => {
  try {
    const { type } = req.query;
    const revenueData = await OrderService.getRevenue(type);

    res.status(200).json({ revenue: revenueData });
  } catch (error) {
    console.error("Lỗi khi lấy doanh thu:", error);
    res.status(500).json({ message: "Lỗi server khi lấy doanh thu" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  updatePaymentStatus,
  updateOrderStatus,
  getRevenue,
};
