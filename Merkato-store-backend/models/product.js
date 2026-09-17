const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    },
    user: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString()
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    verified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    nameAm: {
      type: String,
      trim: true,
      default: ""
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true
    },
    sku: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    brand: {
      type: String,
      default: "Merkato Genuine",
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Price in ETB is required"],
      min: 0
    },
    originalPrice: {
      type: Number,
      default: function () {
        return this.price;
      }
    },
    discountPercent: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: "ETB"
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    inStock: {
      type: Boolean,
      default: true
    },
    stockCount: {
      type: Number,
      default: 10,
      min: 0
    },
    isFlashDeal: {
      type: Boolean,
      default: false
    },
    flashDealStart: {
      type: Date
    },
    flashDealEnd: {
      type: Date
    },
    isTrending: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    isEthiopianMade: {
      type: Boolean,
      default: false
    },
    sellerId: {
      type: String,
      default: "seller-1"
    },
    sellerName: {
      type: String,
      default: "Merkato Merchant"
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller"
    },
    images: {
      type: [String],
      default: []
    },
    colors: {
      type: [String],
      default: []
    },
    sizes: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    descriptionAm: {
      type: String,
      trim: true,
      default: ""
    },
    specs: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    reviews: [reviewSchema],
    views: {
      type: Number,
      default: 0
    },
    salesCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["active", "draft", "out_of_stock", "archived"],
      default: "active"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for fast lookup, category filtering, search, and flash deals
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isFlashDeal: 1 });
productSchema.index({ isTrending: 1 });
productSchema.index({ isEthiopianMade: 1 });
productSchema.index({ name: "text", nameAm: "text", description: "text", brand: "text" });

// Auto-generate id / slug if missing
productSchema.pre("save", function () {
  if (!this.id) {
    this.id = `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  if (this.stockCount <= 0) {
    this.inStock = false;
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;