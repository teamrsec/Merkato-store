const Order = require("../models/order");
const Product = require("../models/product");

// @desc    Create a new order with server-side authoritative price calculation & stock validation
// @route   POST /api/orders
// @access  Public / Authenticated
const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      deliveryAddress,
      paymentMethod,
      couponCode,
      deliveryFee
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No order items provided" });
    }

    if (!deliveryAddress || !deliveryAddress.fullName || !deliveryAddress.phone) {
      return res.status(400).json({ success: false, message: "Incomplete delivery address" });
    }

    const serverDeliveryFee = 150;
    let subtotal = 0;
    const verifiedItems = [];
    const productsToUpdate = [];
    const requestedQuantities = new Map();

    for (const item of items) {
      const quantity = Number(item.quantity);
      if (!item.id || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ success: false, message: "Each item needs a valid product id and quantity" });
      }
      requestedQuantities.set(item.id, (requestedQuantities.get(item.id) || 0) + quantity);
    }

    for (const item of items) {
      const quantity = Number(item.quantity);
      const dbProduct = await Product.findOne({
        $or: [
          { id: item.id },
          { _id: item.id && item.id.match(/^[0-9a-fA-F]{24}$/) ? item.id : null }
        ]
      });

      if (!dbProduct) {
        return res.status(404).json({ success: false, message: `Product ${item.id} was not found` });
      }

      const requestedQuantity = requestedQuantities.get(item.id);
      if (dbProduct.status !== "active" || !dbProduct.inStock || dbProduct.stockCount < requestedQuantity) {
        return res.status(409).json({ success: false, message: `${dbProduct.name} is unavailable or has insufficient stock` });
      }

      const itemPrice = dbProduct.price;
      subtotal += itemPrice * quantity;
      if (!productsToUpdate.some(({ product }) => String(product._id) === String(dbProduct._id))) {
        productsToUpdate.push({ product: dbProduct, quantity: requestedQuantity });
      }
      verifiedItems.push({
        id: dbProduct.id || dbProduct._id.toString(),
        productId: dbProduct._id,
        name: dbProduct.name,
        nameAm: dbProduct.nameAm,
        price: itemPrice,
        originalPrice: dbProduct.originalPrice || itemPrice,
        quantity,
        image: dbProduct.images?.[0] || "",
        category: dbProduct.category,
        brand: dbProduct.brand,
        sellerName: dbProduct.sellerName,
        selectedVariant: item.selectedVariant || "Standard"
      });
    }

    for (const { product, quantity } of productsToUpdate) {
      const updated = await Product.findOneAndUpdate(
        { _id: product._id, status: "active", inStock: true, stockCount: { $gte: quantity } },
        {
          $inc: { stockCount: -quantity },
          $set: { inStock: product.stockCount - quantity > 0 }
        },
        { new: true }
      );
      if (!updated) {
        return res.status(409).json({ success: false, message: "Stock changed while placing the order; please try again" });
      }
    }

    // Calculate coupon discount
    let discount = 0;
    if (couponCode) {
      const cleanCoupon = couponCode.trim().toUpperCase();
      if (cleanCoupon === "WELCOME10") {
        discount = Math.round((subtotal * 10) / 100);
      } else if (cleanCoupon === "TELEBIRR5") {
        discount = Math.round((subtotal * 5) / 100);
      } else if (cleanCoupon === "MERKATO500") {
        discount = 500;
      }
    }

    const calculatedTotal = Math.max(0, subtotal + serverDeliveryFee - discount);
    const newOrderId = `ETH-${Math.floor(10000 + Math.random() * 90000)}`;

    const order = await Order.create({
      id: newOrderId,
      user: req.user._id,
      items: verifiedItems,
      subtotal,
      deliveryFee: serverDeliveryFee,
      discount,
      total: calculatedTotal,
      couponCode: couponCode || null,
      paymentMethod: paymentMethod === "cbe_birr" ? "cbe-birr" : (paymentMethod || "telebirr"),
      paymentStatus:
        paymentMethod === "cod"
          ? "Cash on Delivery (Pending Handover)"
          : "Payment Verified (Instant Telebirr/Bank)",
      deliveryAddress,
      status: "order_placed",
      courier: {
        name: "Yared Tadesse",
        phone: "+251 912 884433",
        vehicle: "Motorcycle (Plate: AA-3-4920)",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      },
      timeline: [
        { status: "order_placed", label: "Order Placed", time: "Just now", completed: true },
        {
          status: "payment_confirmed",
          label: "Payment Confirmed",
          time: paymentMethod !== "cod" ? "Just now" : "Pending",
          completed: paymentMethod !== "cod"
        },
        { status: "preparing", label: "Preparing at Merkato Central Hub", time: "Estimated in 30 mins", completed: false },
        { status: "shipped", label: "Handed to Dispatch Courier", time: "Pending", completed: false },
        { status: "out_for_delivery", label: "Out for Delivery", time: "Pending", completed: false },
        { status: "delivered", label: "Delivered", time: "Today", completed: false }
      ]
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (or user orders)
// @route   GET /api/orders
// @access  Public / Authenticated
const getOrders = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { user: req.user._id };
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by orderId or MongoDB _id (for tracking)
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      $or: [
        { id: id.toUpperCase() },
        { id: id },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (req.user.role !== "admin" && String(order.user) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "You are not allowed to access this order" });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private / Public Demo
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["order_placed", "payment_confirmed", "preparing", "shipped", "out_for_delivery", "delivered", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid order status" });
    }

    const order = await Order.findOne({
      $or: [
        { id: id.toUpperCase() },
        { id: id },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    order.timeline.push({
      status,
      label: status.replace(/_/g, " "),
      time: "Just now",
      completed: true
    });

    await order.save();

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};
