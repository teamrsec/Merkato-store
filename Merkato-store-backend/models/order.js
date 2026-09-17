const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    nameAm: { type: String, default: "" },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
    category: { type: String },
    brand: { type: String },
    sellerName: { type: String },
    selectedVariant: { type: String, default: "Standard" }
  },
  { _id: false }
);

const timelineStepSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    label: { type: String, required: true },
    time: { type: String, default: () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    completed: { type: Boolean, default: false }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    deliveryFee: {
      type: Number,
      default: 150,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    couponCode: {
      type: String,
      default: null
    },
    paymentMethod: {
      type: String,
      enum: ["telebirr", "cbe-birr", "bank", "cod"],
      default: "telebirr"
    },
    paymentStatus: {
      type: String,
      default: "Pending"
    },
    deliveryAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, default: "Addis Ababa" },
      subCity: { type: String, required: true },
      address: { type: String, required: true },
      instructions: { type: String, default: "" }
    },
    status: {
      type: String,
      enum: ["order_placed", "payment_confirmed", "preparing", "shipped", "out_for_delivery", "delivered", "cancelled"],
      default: "order_placed"
    },
    courier: {
      name: { type: String, default: "Yared Tadesse" },
      phone: { type: String, default: "+251 912 884433" },
      vehicle: { type: String, default: "Motorcycle (Plate: AA-3-4920)" },
      photo: {
        type: String,
        default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      }
    },
    timeline: [timelineStepSchema]
  },
  {
    timestamps: true
  }
);

orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
