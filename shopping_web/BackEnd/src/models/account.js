const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    role: { type: String, required: true, default: "user" },
    name: { type: String, required: true, default: "Guest" },
    email: { type: String, required: true },
    password: { type: String, minLength: 6, required: true },
    refreshToken: { type: String },
    emailToken: { type: String },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports =
  mongoose.models.accounts || mongoose.model("accounts", AccountSchema);
