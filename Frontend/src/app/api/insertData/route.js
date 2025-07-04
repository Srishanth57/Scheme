// insertData.js
// This script is meant to be run directly with Node.js (e.g., `node insertData.js`)

import mongoose from "mongoose";

import ChildrenSchemes from "models/Children";

import { childrenScheme } from "app/data/children";
import AgricultureSchemes from "models/Agriculture";
import CasteSchemes from "models/Caste";
import { disabled } from "app/data/disabled";
import DisabledSchemes from "models/Disabled";
import HealthCareSchemes from "models/HealthCare";
import { healthCare } from "app/data/healthCare";

import { nationalHealthMission } from "app/data/government";
import { scheme } from "app/data/government";
import { keralaWaterAuthority } from "app/data/government";
import { lifeMission } from "app/data/government";
import { cooperative } from "app/data/government";
import { policeDepartment } from "app/data/government";
import connectDB from "lib/db";
import { getSchemeModel } from "lib/govtSchemeModel";
// --- IMPORTANT: For standalone scripts, you MUST manually load dotenv ---
// Load from .env.local for development variables
// Or if you have a general .env: dotenv.config({ path: ".env" });

const CasteSchemeData = disabled;

async function insertData() {
  try {
    // Log the URI *before* connecting to confirm it's loaded
    console.log(
      "MONGODB_URI in insertData.js:",
      process.env.MONGODB_URI
        ? process.env.MONGODB_URI.substring(0, 20) + "..."
        : "undefined"
    );

    if (!process.env.MONGODB_URI) {
      console.error(
        "Error: MONGODB_URI is not defined. Please check your .env.local file and ensure it's at the project root."
      );
      return; // Exit if URI is not found
    }

    await connectDB(); // This connectDB will now use the loaded MONGODB_URI

    // 4. Insert the data using insertMany
    const Schema = await getSchemeModel("Government_Cooperative");
    const result = await HealthCareSchemes.updateMany(
      {},
      { $set: { ratings: { avgRating: 0, count: 0 } } }
    );
    console.log("Successfully inserted data:", result);
  } catch (err) {
    if (err.code === 11000) {
      console.error(
        "Error: Duplicate ID found. Data might already exist in the database."
      );
    } else {
      console.error("Error inserting data:", err.message);
    }
  } finally {
    // Disconnect from MongoDB after the operation
    mongoose.disconnect();
  }
}

// Call the function to execute the insertion
insertData();
