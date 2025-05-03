const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const verifyToken = require("../middleware/verifyToken");

router.post("/addproduct", verifyToken, productController.addProduct);
router.get("/allproducts", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.delete(
  "/removeproduct/:id",
  verifyToken,
  productController.removeProduct
);
router.put("/updateproduct/:id", verifyToken, productController.updateProduct);

module.exports = router;
