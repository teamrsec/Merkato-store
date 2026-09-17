const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, "Store name is required"],
      trim: true
    },
    nameAm: {
      type: String,
      trim: true
    },
    logo: {
      type: String,
      default: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80"
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
    salesCount: {
      type: Number,
      default: 0
    },
    location: {
      type: String,
      default: "Merkato, Addis Ababa"
    },
    badge: {
      type: String,
      default: "Verified Merchant 🇪🇹"
    },
    isVerified: {
      type: Boolean,
      default: true
    },
    joinedYear: {
      type: String,
      default: () => new Date().getFullYear().toString()
    },
    description: {
      type: String,
      default: ""
    },
    tinNumber: {
      type: String,
      default: ""
    },
    telebirrMerchantId: {
      type: String,
      default: ""
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

sellerSchema.index({ name: "text", description: "text" });

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
