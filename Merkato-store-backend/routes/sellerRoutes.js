const express = require("express");
const router = express.Router();
const {
  getSellers,
  getSellerById,
  getSellerProducts,
  updateSeller
} = require("../controllers/sellerController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getSellers);
router.get("/:id", getSellerById);
router.get("/:id/products", getSellerProducts);
router.put("/:id", protect, authorize("seller", "admin"), updateSeller);

module.exports = router;
