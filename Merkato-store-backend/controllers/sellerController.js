const Seller = require("../models/seller");
const Product = require("../models/product");

// @desc    Get all verified sellers
// @route   GET /api/sellers
// @access  Public
const getSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find({ isVerified: true }).sort({ rating: -1 });
    res.json({
      success: true,
      count: sellers.length,
      sellers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get seller by ID
// @route   GET /api/sellers/:id
// @access  Public
const getSellerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findOne({
      $or: [
        { sellerId: id },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ]
    });

    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    res.json({
      success: true,
      seller
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products for a seller
// @route   GET /api/sellers/:id/products
// @access  Public
const getSellerProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await Product.find({
      $or: [{ sellerId: id }, { seller: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update seller profile
// @route   PUT /api/sellers/:id
// @access  Private (Seller/Admin)
const updateSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === "seller" && req.user.sellerId !== id) {
      return res.status(403).json({ success: false, message: "You can only update your own seller profile" });
    }
    const seller = await Seller.findOneAndUpdate(
      {
        $or: [
          { sellerId: id },
          { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
        ]
      },
      req.body,
      { new: true }
    );

    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    res.json({
      success: true,
      message: "Seller profile updated",
      seller
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellers,
  getSellerById,
  getSellerProducts,
  updateSeller
};
