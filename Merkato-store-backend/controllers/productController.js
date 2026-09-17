const Product = require("../models/product");

// @desc    Get all products with search, filter, sort & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      isEthiopianMade,
      inStock,
      isFlashDeal,
      isTrending,
      isNewArrival,
      sellerId,
      sort,
      page = 1,
      limit = 100
    } = req.query;

    const query = { status: { $ne: "archived" } };

    // Search by text or name regex
    if (search && search.trim()) {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { nameAm: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];
    }

    // Category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Brand filter
    if (brand && brand !== "all") {
      query.brand = brand;
    }

    // Price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }

    // Boolean filters
    if (isEthiopianMade === "true" || isEthiopianMade === true) {
      query.isEthiopianMade = true;
    }

    if (inStock === "true" || inStock === true) {
      query.inStock = true;
    }

    if (isFlashDeal === "true" || isFlashDeal === true) {
      query.isFlashDeal = true;
    }

    if (isTrending === "true" || isTrending === true) {
      query.isTrending = true;
    }

    if (isNewArrival === "true" || isNewArrival === true) {
      query.isNewArrival = true;
    }

    if (sellerId) {
      query.sellerId = sellerId;
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "price-low") {
      sortOption = { price: 1 };
    } else if (sort === "price-high") {
      sortOption = { price: -1 };
    } else if (sort === "rating") {
      sortOption = { rating: -1, reviewsCount: -1 };
    } else if (sort === "popular") {
      sortOption = { reviewsCount: -1, rating: -1 };
    } else if (sort === "newest") {
      sortOption = { createdAt: -1 };
    }

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 100;
    const skip = (pageNum - 1) * limitNum;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: products.length,
      totalProducts,
      page: pageNum,
      totalPages: Math.ceil(totalProducts / limitNum) || 1,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get flash deals
// @route   GET /api/products/flash-deals
// @access  Public
const getFlashDeals = async (req, res, next) => {
  try {
    const products = await Product.find({ isFlashDeal: true, inStock: true }).sort({ discountPercent: -1 });
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending products
// @route   GET /api/products/trending
// @access  Public
const getTrendingProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isTrending: true }).sort({ rating: -1, reviewsCount: -1 }).limit(10);
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by id or slug
// @route   GET /api/products/:idOrSlug
// @access  Public
const getProductByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    
    let product = await Product.findOne({
      $or: [
        { id: idOrSlug },
        { slug: idOrSlug.toLowerCase() },
        { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }
      ]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Increment views asynchronously
    Product.findByIdAndUpdate(product._id, { $inc: { views: 1 } }).exec();

    res.json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Seller/Admin)
const createProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };
    if (req.user.role === "seller") {
      if (!req.user.sellerId) {
        return res.status(403).json({ success: false, message: "Seller profile is not configured" });
      }
      productData.sellerId = req.user.sellerId;
      delete productData.seller;
      delete productData.rating;
      delete productData.reviews;
      delete productData.reviewsCount;
    }
    if (!productData.id) {
      productData.id = `prod-custom-${Date.now()}`;
    }
    if (!productData.images || productData.images.length === 0) {
      if (productData.image) {
        productData.images = [productData.image];
      }
    }
    
    const product = await Product.create(productData);
    res.status(201).json({
      success: true,
      message: "Product published successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Seller/Admin)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (req.user.role === "seller" && product.sellerId !== req.user.sellerId) {
      return res.status(403).json({ success: false, message: "You can only modify your own products" });
    }

    const updates = { ...req.body };
    delete updates._id;
    delete updates.id;
    if (req.user.role === "seller") {
      delete updates.sellerId;
      delete updates.sellerName;
      delete updates.seller;
      delete updates.rating;
      delete updates.reviews;
      delete updates.reviewsCount;
      delete updates.salesCount;
      delete updates.views;
    }
    Object.assign(product, updates);
    const updatedProduct = await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Seller/Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      $or: [
        { id: id },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (req.user.role === "seller" && product.sellerId !== req.user.sellerId) {
      return res.status(403).json({ success: false, message: "You can only delete your own products" });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add review to product
// @route   POST /api/products/:id/reviews
// @access  Public / Authenticated
const addProductReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: "Please provide a rating and comment" });
    }

    const product = await Product.findOne({
      $or: [
        { id: id },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      user: req.user.name,
      userId: req.user._id,
      rating: Number(rating),
      date: "Just now",
      comment: comment.trim(),
      verified: true
    };

    product.reviews.unshift(newReview);
    product.reviewsCount = product.reviews.length;
    product.rating = Number(
      (product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length).toFixed(1)
    );

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getFlashDeals,
  getTrendingProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview
};
