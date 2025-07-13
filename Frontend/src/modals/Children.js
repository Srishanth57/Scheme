import mongoose from "mongoose";

const MultilingualString = {
  en: { type: String, required: true },
  ml: { type: String, required: true },
};

const MultilingualStringArray = {
  en: { type: [String], required: true },
  ml: { type: [String], required: true },
};

const ChildrenSchemeSchema = new mongoose.Schema(
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
    applicationProcess: MultilingualString,
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
  { collection: "ChildrenSchemesNew", timestamps: true }
);

const ChildrenSchemes =
  mongoose.models.ChildrenSchemesNew ||
  mongoose.model("ChildrenSchemesNew", ChildrenSchemeSchema);
export default ChildrenSchemes;
