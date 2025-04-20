const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user_id: {
      ref: "users",
      type: Schema.Types.ObjectId,
      default: "",
    },
    shipping_address: Object,
    order_status: {
      required: true,
      type: String,
      default: "pending",
    },
    order_total: {
      type: Number,
    },
    payment_method: { required: true, type: String },
    payment_status: {
      type: String,
      default: "pending",
    },
    order_items: [Object],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);
