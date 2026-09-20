import mongoose from "mongoose";

// Set required to false so incomplete data doesn't crash the seeder
const MultilingualString = {
  en: { type: String, required: false },
  ml: { type: String, required: false },
};

const MultilingualStringArray = {
  en: { type: [String], required: false },
  ml: { type: [String], required: false },
};

const SchemeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    schemeType: { type: String, required: true, index: true },
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
    link: { type: String, required: false }, // Made optional as well
  },
  { collection: "All_Schemes_Unified", timestamps: true },
);

const Scheme = mongoose.models.Scheme || mongoose.model("Scheme", SchemeSchema);
export default Scheme;
