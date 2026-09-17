require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/category");
const Seller = require("../models/seller");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

const {
  categoriesData,
  sellersData,
  usersData,
  productsData,
  sampleOrdersData
} = require("./seedData");

async function seedDatabase() {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/merkato_store";
  
  try {
    console.log(`Connecting to MongoDB: ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding.");

    const hasExistingData = await Promise.all([
      Category.exists({}),
      Seller.exists({}),
      User.exists({}),
      Product.exists({})
    ]);
    if (hasExistingData.some(Boolean) && !process.argv.includes("--reset")) {
      throw new Error("Database already contains data. Re-run with --reset to replace it.");
    }
    if (process.argv.includes("--reset")) {
      console.log("Reset requested; clearing existing data...");
      await Category.deleteMany({});
      await Seller.deleteMany({});
      await User.deleteMany({});
      await Product.deleteMany({});
      await Order.deleteMany({});
    }

    // Seed Categories
    console.log("Seeding categories...");
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`✓ Inserted ${createdCategories.length} categories.`);

    // Seed Sellers
    console.log("Seeding sellers...");
    const createdSellers = await Seller.insertMany(sellersData);
    console.log(`✓ Inserted ${createdSellers.length} sellers.`);

    // Seed Users (using create to trigger pre-save password hashing)
    console.log("Seeding users...");
    const createdUsers = [];
    for (const u of usersData) {
      const user = await User.create(u);
      createdUsers.push(user);
    }
    console.log(`✓ Inserted ${createdUsers.length} users with hashed passwords.`);

    // Seed Products
    console.log("Seeding products...");
    const createdProducts = await Product.insertMany(productsData);
    console.log(`✓ Inserted ${createdProducts.length} products.`);

    // Seed Sample Orders
    console.log("Seeding sample orders...");
    const sampleOrdersWithUser = sampleOrdersData.map((order) => ({
      ...order,
      user: createdUsers[0]._id
    }));
    const createdOrders = await Order.insertMany(sampleOrdersWithUser);
    console.log(`✓ Inserted ${createdOrders.length} orders.`);

    console.log("\n==========================================");
    console.log(" 🎉 Merkato Store Database Seeded Successfully!");
    console.log("==========================================");
    console.log(`Categories: ${createdCategories.length}`);
    console.log(`Sellers:    ${createdSellers.length}`);
    console.log(`Users:      ${createdUsers.length}`);
    console.log(`Products:   ${createdProducts.length}`);
    console.log(`Orders:     ${createdOrders.length}`);
    console.log("==========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedDatabase();
