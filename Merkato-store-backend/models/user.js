const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ["buyer", "customer", "seller", "admin", "delivery_agent"],
      default: "buyer"
    },
    sellerId: {
      type: String,
      trim: true
    },
    subCity: {
      type: String,
      default: "Bole"
    },
    city: {
      type: String,
      default: "Addis Ababa"
    },
    address: {
      type: String,
      default: ""
    },
    points: {
      type: Number,
      default: 100
    },
    isVerified: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    savedAddresses: [
      {
        fullName: String,
        phone: String,
        city: { type: String, default: "Addis Ababa" },
        subCity: String,
        address: String,
        instructions: String,
        isDefault: { type: Boolean, default: false }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Exclude password from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
