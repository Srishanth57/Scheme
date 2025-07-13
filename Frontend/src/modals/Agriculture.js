import mongoose from "mongoose";

const MultilingualString = {
  en: { type: String, required: true },
  ml: { type: String, required: true },
};

const MultilingualStringArray = {
  en: { type: [String], required: true },
  ml: { type: [String], required: true },
};

const AgricultureSchemeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: MultilingualString,
    description: MultilingualString,
    // Added targetAudience field
    targetAudience: MultilingualString,
    benefits: MultilingualString,
    category: MultilingualString,
    implementingAgency: MultilingualString,
    // Added eligibility field
    eligibility: MultilingualString,
    // Added documentsRequired field
    documentsRequired: MultilingualString,
    // Added applicationProcess field
    applicationProcess: MultilingualString,
    ageGroup: MultilingualString,
    gender: MultilingualString,
    incomeLevel: MultilingualString,
    profession: MultilingualString,
    location: MultilingualString,
    socialCategory: MultilingualStringArray,
    keywords: MultilingualStringArray,
    link: { type: String, required: true },
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
  { collection: "AgricultureSchemesNew", timestamps: true }
);

const AgricultureSchemes =
  mongoose.models.AgricultureSchemesNew ||
  mongoose.model("AgricultureSchemesNew", AgricultureSchemeSchema);
export default AgricultureSchemes;
