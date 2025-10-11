import mongoose from "mongoose";

const UserRatingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    schemeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true },
  },
  { collection: "UserRating" }
);

UserRatingSchema.index({ userId: 1, schemeId: 1 }, { unique: true }); // 🔒 Prevent duplicates

export default mongoose.models.UserRating ||
  mongoose.model("UserRating", UserRatingSchema);
