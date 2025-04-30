const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");

// Tạo đánh giá mới
router.post("/review", reviewController.createReview);
// Lấy danh sách đánh giá theo productId
router.get("/review/:productId", reviewController.getReviewsByProduct);

module.exports = router;
