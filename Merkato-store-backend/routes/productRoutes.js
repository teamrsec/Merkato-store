const express = require("express");
const router = express.Router();
const {
  getProducts,
  getFlashDeals,
  getTrendingProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/flash-deals", getFlashDeals);
router.get("/trending", getTrendingProducts);
router.get("/", getProducts);
router.get("/:idOrSlug", getProductByIdOrSlug);
router.post("/", protect, authorize("seller", "admin"), createProduct);
router.put("/:id", protect, authorize("seller", "admin"), updateProduct);
router.delete("/:id", protect, authorize("seller", "admin"), deleteProduct);
router.post("/:id/reviews", protect, authorize("buyer", "customer", "seller", "admin"), addProductReview);

module.exports = router;
