const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");
const verifyToken = require("../middleware/verifyToken");

// Tạo đánh giá mới
router.post("/review", verifyToken, reviewController.createReview);
// Lấy danh sách đánh giá theo productId
router.get(
  "/review/:productId",
  verifyToken,
  reviewController.getReviewsByProduct
);

module.exports = router;
