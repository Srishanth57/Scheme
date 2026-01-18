import mongoose from "mongoose";

const MultilingualString = {
  en: { type: String, required: true },
  ml: { type: String, required: true },
};

const MultilingualStringArray = {
  en: { type: [String], required: true },
  ml: { type: [String], required: true },
};

const HealthCareSchemeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: MultilingualString,
    description: MultilingualString,
    targetAudience: MultilingualString,
    benefits: MultilingualString,
    category: MultilingualString,
    implementingAgency: MultilingualString,
    eligibility: MultilingualString,
    documentsRequired: MultilingualString,
    ageGroup: MultilingualString,
    gender: MultilingualString,
    incomeLevel: MultilingualString,
    profession: MultilingualString,
    location: MultilingualString,
    socialCategory: MultilingualStringArray,
    keywords: MultilingualStringArray,
    link: {
      type: String,
      required: true,
    },
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
  { collection: "HealthCareSchemesNew", timestamps: true }
);

const HealthCareSchemes =
  mongoose.models.HealthCareSchemesNew ||
  mongoose.model("HealthCareSchemesNew", HealthCareSchemeSchema);
export default HealthCareSchemes;
