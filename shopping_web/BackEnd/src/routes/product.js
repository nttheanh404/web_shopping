const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/addproduct", productController.addProduct);
router.get("/allproducts", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.delete("/removeproduct/:id", productController.removeProduct);
router.put("/updateproduct/:id", productController.updateProduct);

module.exports = router;
