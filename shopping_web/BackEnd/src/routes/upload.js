const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/UploadController");
const verifyToken = require("../middleware/verifyToken");

router.post("/upload", uploadImage);

module.exports = router;
