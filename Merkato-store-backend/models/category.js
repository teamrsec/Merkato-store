const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true
    },
    nameAm: {
      type: String,
      trim: true
    },
    icon: {
      type: String,
      default: "ShoppingBag"
    },
    image: {
      type: String,
      default: ""
    },
    itemCount: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "from-blue-500/10 to-indigo-500/20"
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

categorySchema.index({ sortOrder: 1 });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
