// services/cloudinary.service.js
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "web_project",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const uploadCloud = multer({ storage });

module.exports = { uploadCloud };
