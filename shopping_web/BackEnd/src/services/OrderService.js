const Order = require("../models/order");
const Account = require("../models/account");
const Product = require("../models/product");
require("dotenv").config();

const { createPaymentGateway } = require("../services/PaymentService");

const createOrder = async (req) => {
  try {
    const orderData = req.body;
    const { payment_method } = orderData;
    const response = await Order.create(orderData);
    if (payment_method === "cash_on_delivery") {
      return `${FRONTEND_URL}/success-order`;
    }
    return createPaymentGateway(req, orderData.order_total, response._id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create order");
  }
};

const getAllOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

const getOrderById = async (id) => {
  return await Order.findById(id);
};

const getOrdersByUserId = async (userId) => {
  return await Order.find({ user_id: userId }).sort({ createdAt: -1 });
};

const updateOrder = async (id, updateData) => {
  return await Order.findByIdAndUpdate(id, updateData);
};

const getRevenue = async (type) => {
  let startDate;
  let groupFormat;

  const now = new Date();

  switch (type) {
    case "day":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      groupFormat = { $hour: "$createdAt" };
      break;
    case "week": {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
      groupFormat = {
        $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
      };
      break;
    }
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);

      groupFormat = {
        $concat: [{ $toString: { $isoWeek: "$createdAt" } }, ""],
      };
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      groupFormat = {
        $dateToString: { format: "%m-%Y", date: "$createdAt" },
      };
      break;
    default:
      startDate = new Date(0);
      groupFormat = null;
  }

  const pipeline = [
    {
      $match: {
        order_status: "completed",
        createdAt: { $gte: startDate },
      },
    },
  ];

  if (groupFormat) {
    pipeline.push(
      {
        $group: {
          _id: groupFormat,
          total: { $sum: "$order_total" },
        },
      },
      {
        $sort: { _id: 1 },
      }
    );
  } else {
    pipeline.push({
      $group: {
        _id: null,
        total: { $sum: "$order_total" },
      },
    });
  }

  const revenue = await Order.aggregate(pipeline);
  return revenue;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  getRevenue,
};
