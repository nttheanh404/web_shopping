const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "orders",
      required: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
