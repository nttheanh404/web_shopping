const reviewService = require("../services/ReviewService");
const Order = require("../models/order");
const mongoose = require("mongoose");
const createReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, comment } = req.body;

    // Kiểm tra đã đánh giá chưa
    const existingReview = await reviewService.getReviewByUserAndProduct(
      user_id,
      product_id
    );
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "Bạn đã đánh giá sản phẩm này rồi." });
    }

    // Kiểm tra đơn hàng đã mua sản phẩm này và đã hoàn tất chưa
    const hasOrdered = await Order.findOne({
      user_id: new mongoose.Types.ObjectId(user_id),
      order_status: "completed",
      order_items: {
        $elemMatch: { _id: product_id },
      },
    });

    console.log("Received req.body:", req.body);

    if (!hasOrdered) {
      return res.status(403).json({
        message: "Bạn chưa mua sản phẩm này hoặc đơn hàng chưa hoàn tất.",
      });
    }

    // Lưu đánh giá
    const review = await reviewService.createReview({
      user_id,
      product_id,
      rating,
      comment,
    });

    await Order.updateOne(
      { _id: hasOrdered._id },
      { $set: { order_status: "reviewed" } }
    );

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Tạo đánh giá thất bại", error });
  }
};

const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ message: "productId không hợp lệ" });
    }
    const reviews = await reviewService.getReviewsByProductId(productId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy đánh giá", error });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct,
};
