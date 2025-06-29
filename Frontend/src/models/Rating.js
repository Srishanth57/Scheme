import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
      index: true,
    },
    value: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

RatingSchema.index({ userId: 1, schemeId: 1 }, { unique: true }); // each user rates once per scheme
export default mongoose.models.Rating || mongoose.model("Rating", RatingSchema);