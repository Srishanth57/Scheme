import mongoose from "mongoose";

// Define the main GovernmentScheme Schema
const GovernmentSchemeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    implementedBy: { type: [String], required: true }, // Can be an array of strings
    objective: { type: String, required: false }, // Can be NaN in some cases
    targetBeneficiaries: { type: String, required: false }, // Can be NaN
    eligibilityCriterias: { type: String, required: false }, // Can be NaN
    benefitsProvided: { type: String, required: false }, // Can be NaN
    applicationProcess: { type: String, required: false }, // Can be NaN
    contact: { type: String, required: false }, // Can be NaN, or a multi-line string
  },
  {
    collection: "Government_PoliceDepartment", // Explicitly set the collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a Mongoose Model from the Schema
// This prevents Mongoose from recompiling the model if it already exists

export default GovernmentSchemeSchema;
