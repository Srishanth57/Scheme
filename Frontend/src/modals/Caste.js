import mongoose from "mongoose";

// Define the schema for the application_process sub-document
const ApplicationProcessSchema = new mongoose.Schema(
  {
    link: { type: String, required: false }, // Link might be "N/A" so not strictly required at schema level
    process_description: { type: String, required: false }, // Can be "N/A"
  },
  { _id: false } // Do not create a default _id for subdocuments
);

// Define the main CasteScheme Schema
const CasteSchemeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    eligibility: { type: String, required: true },
    application_process: { type: ApplicationProcessSchema, required: true }, // Embed the sub-schema
    documents_required: { type: String, required: true },
    benefits: { type: String, required: true },
    keywords: { type: [String], required: true }, // Array of strings
    socialCategory: { type: [String], required: true }, // Array of strings
    profession: { type: String, required: true },
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
    collection: "CasteSchemes", // Explicitly set the collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a Mongoose Model from the Schema
// This prevents Mongoose from recompiling the model if it already exists
const CasteSchemes =
  mongoose.models.CasteSchemes ||
  mongoose.model("CasteSchemes", CasteSchemeSchema);

export default CasteSchemes;
