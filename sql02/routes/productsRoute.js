const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  // searchProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getAllProducts);
// router.get("/search", searchProduct); //req.query --- route /search must put above /:id else program will think that search is parameter
router.get("/:id", getProductById);
router.post("/", createProduct);
// Homework
router.delete("/:id", deleteProduct); // req.params
router.put("/:id", updateProduct); // req.params + req.body
// /products?name="Complete"
module.exports = router;
