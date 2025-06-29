import mongoose from "mongoose";

const AgricultureSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    implementingAgency: { type: String, required: true },
    benefits: { type: String, required: true },
    ageGroup: { type: String, required: true },
    gender: { type: String, required: true },
    incomeLevel: { type: String, required: true },
    profession: { type: String, required: true },
    location: { type: String, required: true },
    socialCategory: { type: [String], required: true },
    keywords: { type: [String], required: true },
    link: { type: String },

    //  { type: mongoose.Schema.Types.Mixed }, // Can be Number or String
  },
  {
    collection: "AgricultureSchemes",
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

// 3. Create a Mongoose Model from the Schema
const AgricultureSchemes =
  mongoose.models.AgricultureSchemes ||
  mongoose.model("AgricultureSchemes", AgricultureSchema);
export default AgricultureSchemes;
