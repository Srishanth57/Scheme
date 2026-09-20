import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 1. Native Node.js requires explicit .js extensions and exact relative paths
import Scheme from "../../../models/Scheme.js";

import { agricultureScheme } from "../translatedData/agriculture.js";
import { casteScheme } from "../translatedData/caste.js";
import { childrenScheme } from "../translatedData/children.js";
import { healthCare } from "../translatedData/healthcare.js";
import { disabled } from "../translatedData/disabled.js";
import { womenScheme } from "../translatedData/women.js";
import { elderly } from "../translatedData/elderly.js";

// 2. Resolve the path to your root .env file so dotenv can find it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

async function insertData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");

    // Map through the data and append the 'schemeType' string
    const allData = [
      ...agricultureScheme.map((s) => ({ ...s, schemeType: "agriculture" })),
      ...casteScheme.map((s) => ({ ...s, schemeType: "caste" })),
      ...childrenScheme.map((s) => ({ ...s, schemeType: "children" })),
      ...healthCare.map((s) => ({ ...s, schemeType: "healthCare" })),
      ...disabled.map((s) => ({ ...s, schemeType: "disabled" })),
      ...womenScheme.map((s) => ({ ...s, schemeType: "women" })),
      ...elderly.map((s) => ({ ...s, schemeType: "elderly" })),
    ];

    // Clear old data (optional, prevents duplicates during dev)
    await Scheme.deleteMany({});

    // Insert all data into the single unified collection
    await Scheme.insertMany(allData);
    console.log(
      "✅ All schemes inserted successfully into the unified collection.",
    );
  } catch (err) {
    console.error("❌ Insertion error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

insertData();
