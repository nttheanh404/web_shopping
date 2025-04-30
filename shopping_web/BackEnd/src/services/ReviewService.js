const Review = require("../models/review");

const createReview = async (data) => {
  const review = new Review(data);
  return await review.save();
};

const getReviewsByProductId = async (productId) => {
  return await Review.find({ product_id: productId }).populate(
    "user_id",
    "name"
  );
};

const getReviewByUserAndProduct = async (userId, productId) => {
  return await Review.findOne({ user_id: userId, product_id: productId });
};

module.exports = {
  createReview,
  getReviewsByProductId,
  getReviewByUserAndProduct,
};
