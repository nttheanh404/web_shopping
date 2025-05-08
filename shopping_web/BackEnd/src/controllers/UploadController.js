const { uploadCloud } = require("../services/UploadService");

const uploadImage = [
  uploadCloud.single("image"), // middleware xử lý upload
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Không có file được upload",
      });
    }

    res.json({
      success: true,
      message: "Upload thành công!",
      url: req.file.path,
      file: req.file,
    });
  },
];

module.exports = { uploadImage };
