import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema({
  name: String,
  description: String,
  avgRating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
});

export default mongoose.models.Scheme || mongoose.model("Scheme", SchemeSchema);