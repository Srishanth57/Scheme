import mongoose from "mongoose";

// Define the main DisabledScheme Schema
const DisabledSchemeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    targetAudience: { type: String, required: true },
    implementingAgency: { type: String, required: true },
    ageGroup: { type: String, required: true },
    gender: { type: String, required: true },
    incomeLevel: { type: String, required: true },
    location: { type: String, required: true },
    link: { type: String, required: false }, // Link is optional as per your data
    keywords: { type: [String], required: true }, // Array of strings
    profession: { type: String, required: true },
  },
  {
    collection: "DisabledSchemes", // Explicitly set the collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a Mongoose Model from the Schema
// This prevents Mongoose from recompiling the model if it already exists
const DisabledSchemes =
  mongoose.models.DisabledSchemes ||
  mongoose.model("DisabledSchemes", DisabledSchemeSchema);

export default DisabledSchemes;