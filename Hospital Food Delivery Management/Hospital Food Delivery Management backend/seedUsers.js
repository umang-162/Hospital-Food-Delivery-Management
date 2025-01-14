// seedUsers.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // Assuming you have a User model

const connectDB = require("./config/db");

const seedUsers = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear existing users (optional)
    await User.deleteMany();
    console.log("Existing users removed.");

    // Define the users to seed
    const users = [
      {
        name: "Hospital Manager",
        email: "hospital_manager@xyz.com",
        password: "Password@2025",
        role: "Manager",
      },
      {
        name: "Pantry Staff",
        email: "hospital_pantry@xyz.com",
        password: "Password@2025",
        role: "PantryStaff",
      },
      {
        name: "Delivery Personnel",
        email: "hospital_delivery@xyz.com",
        password: "Password@2025",
        role: "DeliveryStaff",
      },
    ];

    // Hash passwords and prepare user objects
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert users into the database
    await User.insertMany(hashedUsers);
    console.log("Users seeded successfully!");

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
