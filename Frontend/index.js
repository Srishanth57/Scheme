import mongoose from "mongoose";
import dotenv from "dotenv";

import AgricultureSchemes from "./src/modals/Agriculture.js";
import { agricultureScheme } from "./src/app/data/translatedData/agriculture.js";
dotenv.config();

async function insertData() {
  try {
    // console.log(process.env.MONGODB_URI);
    console.log(
      "MONGODB_URI in insertData.js:",
      process.env.MONGODB_URI
        ? process.env.MONGODB_URI.substring(0, 20) + "..."
        : "undefined"
    );

 

    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ MongoDB connected successfully");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1); // Stop the app
    } // ✅ connectDB should use MONGODB_URI internally

    // Insert health care schemes
    const result = await AgricultureSchemes.insertMany(agricultureScheme);
    console.log("✅ Successfully inserted health care data:", result.length);
  } catch (err) {
    if (err.code === 11000) {
      console.error("⚠️ Duplicate key error: Data might already exist.");
    } else {
      console.error("❌ Insertion error:", err);
    }
  } finally {
    await mongoose.disconnect();
  }
}

insertData();
