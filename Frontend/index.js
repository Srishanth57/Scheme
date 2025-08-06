import mongoose from "mongoose";
import dotenv from "dotenv";

import AgricultureSchemes from "./src/modals/Agriculture.js";
import { agricultureScheme } from "./src/app/data/translatedData/agriculture.js";
import CasteSchemes from "./src/modals/Caste.js";
import { casteScheme } from "./src/app/data/translatedData/caste.js";
import ChildrenSchemes from "./src/modals/Children.js";
import { childrenScheme } from "./src/app/data/translatedData/children.js";

import HealthCareSchemes from "./src/modals/HealthCare.js";
import { healthCare } from "./src/app/data/translatedData/healthcare.js";
import DisabledSchemes from "./src/modals/Disabled.js";
import { disabled } from "./src/app/data/translatedData/disabled.js";

import { scheme } from "./src/app/data/translatedData/government.js";
import { cooperative } from "./src/app/data/translatedData/government.js";
import { policeDepartment } from "./src/app/data/translatedData/government.js";
import { keralaWaterAuthority } from "./src/app/data/translatedData/government.js";
import { lifeMission } from "./src/app/data/translatedData/government.js";
import { nationalHealthMission } from "./src/app/data/translatedData/government.js";
import WomenSchemes from "./src/modals/Women.js";
import { womenScheme } from "./src/app/data/translatedData/women.js";
import { elderly } from "./src/app/data/translatedData/elderly.js";
import ElderlySchemes from "./src/modals/Elderly.js";
import GovernmentSchemeSchema from "./src/modals/Government.js";
import { getSchemeModel } from "./src/lib/govtSchemeModel.js";

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
    }
    // Insert schemes
    const result = await getSchemeModel(
      "Government_Schemes"
    ).insertMany(scheme);
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

// const allowedGovCollections = [
//   "Government_Cooperative",
//   "Government_KeralaWaterAuthority",
//   "Government_LifeMission",
//   "Government_NationalHealthMission",
//   "Government_PoliceDepartment",
//   "Government_Schemes",
// ];

// Rename collection code

// ✅ connectDB should use MONGODB_URI internally
//     await mongoose.connection.db
//       .collection("Government_lifeMission_New")
//       .rename("Government_LifeMission");
//     console.log("success"); // Used for renaming the scheme names
