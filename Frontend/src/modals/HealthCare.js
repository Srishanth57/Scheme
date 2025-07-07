import mongoose from "mongoose";

// Define the main HealthCareScheme Schema
const HealthCareSchemeSchema = new mongoose.Schema(
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
    profession: { type: String, required: true },
    keywords: { type: [String], required: true }, // Array of strings
    socialCategory: { type: [String], required: true }, // Array of strings
    ratings: {
      avgRating: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    collection: "HealthCareSchemes", // Explicitly set the collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a Mongoose Model from the Schema
// This prevents Mongoose from recompiling the model if it already exists
const HealthCareSchemes =
  mongoose.models.HealthCareSchemes ||
  mongoose.model("HealthCareSchemes", HealthCareSchemeSchema);

export default HealthCareSchemes;
