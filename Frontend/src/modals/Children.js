import mongoose from "mongoose";

// Define the schema for the application_process sub-document
// This is reused from the CasteScheme as it has the same structure
const ApplicationProcessSchema = new mongoose.Schema(
  {
    link: { type: String, required: false }, // Link might be "N/A" so not strictly required at schema level
    process_description: { type: String, required: false }, // Can be "N/A"
  },
  { _id: false } // Do not create a default _id for subdocuments
);

// Define the main ChildrenScheme Schema
const ChildrenSchemeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    eligibility: { type: String, required: true },
    application_process: { type: ApplicationProcessSchema, required: true }, // Embed the sub-schema
    documents_required: { type: String, required: true },
    benefits: { type: String, required: true },
    keywords: { type: [String], required: true }, // Array of strings
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
    }
    // Note: The provided childrenScheme data does not have a 'socialCategory' field,
    // so it's omitted from this schema to match the provided data structure.
  },
  {
    collection: "ChildrenSchemes", // Explicitly set the collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a Mongoose Model from the Schema
// This prevents Mongoose from recompiling the model if it already exists
const ChildrenSchemes =
  mongoose.models.ChildrenSchemes ||
  mongoose.model("ChildrenSchemes", ChildrenSchemeSchema);

export default ChildrenSchemes;