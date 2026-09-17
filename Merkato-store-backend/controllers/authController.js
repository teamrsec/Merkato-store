const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, phone, email, password, subCity, city, address } = req.body;

    if (!name || !phone || !password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, and a password of at least 6 characters are required"
      });
    }

    // Check if phone already exists
    const userExists = await User.findOne({ phone: phone.trim() });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists with this phone number" });
    }

    const user = await User.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      password: password || "123456",
      role: "customer",
      subCity: subCity || "Bole",
      city: city || "Addis Ababa",
      address: address || "",
      points: 100
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        subCity: user.subCity,
        city: user.city,
        address: user.address,
        points: user.points,
        isLoggedIn: true
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a phone number or email and a password"
      });
    }

    const cleanIdentifier = identifier.trim();
    
    // Find user by phone or email, including password for verification
    let user = await User.findOne({
      $or: [{ phone: cleanIdentifier }, { email: cleanIdentifier.toLowerCase() }]
    }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: "This account is inactive" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role === "buyer" ? "customer" : user.role,
        subCity: user.subCity,
        city: user.city,
        address: user.address,
        points: user.points,
        isLoggedIn: true
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role === "buyer" ? "customer" : user.role,
        subCity: user.subCity,
        city: user.city,
        address: user.address,
        points: user.points,
        savedAddresses: user.savedAddresses,
        isLoggedIn: true
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, subCity, city, address, savedAddresses } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (name) user.name = name.trim();
    if (email) user.email = email.trim();
    if (subCity) user.subCity = subCity;
    if (city) user.city = city;
    if (address !== undefined) user.address = address;
    if (savedAddresses) user.savedAddresses = savedAddresses;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role === "buyer" ? "customer" : user.role,
        subCity: user.subCity,
        city: user.city,
        address: user.address,
        points: user.points,
        savedAddresses: user.savedAddresses,
        isLoggedIn: true
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private (Admin)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({
      success: true,
      users: users.map((u) => ({
        id: u._id,
        name: u.name,
        phone: u.phone,
        email: u.email,
        role: u.role.toUpperCase(),
        status: u.isVerified ? "ACTIVE" : "PENDING",
        ordersCount: 0
      }))
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getAllUsers
};
