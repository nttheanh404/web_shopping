const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email không hợp lệ!"], 
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
