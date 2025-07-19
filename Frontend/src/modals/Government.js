import mongoose from "mongoose";
const MultilingualString = {
  en: { type: String, required: true },
  ml: { type: String, required: true },
};

const MultilingualStringArray = {
  en: { type: [String], required: true },
  ml: { type: [String], required: true },
};
// Define the main GovernmentScheme Schema
const GovernmentSchemeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: MultilingualString,
    implementedBy: MultilingualStringArray,
    objective: MultilingualString,
    targetBeneficiaries: MultilingualString,
    eligibilityCriterias: MultilingualString,
    benefitsProvided: MultilingualString,
    applicationProcess: MultilingualString,
    contact: MultilingualString,

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
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export default GovernmentSchemeSchema;
