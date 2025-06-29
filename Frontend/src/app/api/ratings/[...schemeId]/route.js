import { auth } from "@clerk/nextjs/server"; // Clerk helper (server-side)  :contentReference[oaicite:0]{index=0}
import connectDB from "lib/db";
import Rating from "models/Rating";
import Scheme from "models/Scheme";

export async function PUT(req, { params }) {
  const { userId } = await auth(); // null if not signed in
  if (!userId) return new Response("Unauthenticated", { status: 401 });

  const { schemeId } = params;
  const { value } = await req.json(); // expected 1–5

  await connectDB();

  // 1 · Upsert the individual rating
  await Rating.findOneAndUpdate(
    { userId, schemeId },
    { value },
    { new: true, upsert: true }
  );

  // 2 · Recompute scheme aggregate
  const agg = await Rating.aggregate([
    { $match: { schemeId: new mongoose.Types.ObjectId(schemeId) } },
    {
      $group: {
        _id: "$schemeId",
        avgRating: { $avg: "$value" },
        ratingCount: { $sum: 1 },
      },
    },
  ]);
  const { avgRating = 0, ratingCount = 0 } = agg[0] || {};

  await Scheme.findByIdAndUpdate(schemeId, { avgRating, ratingCount });

  return Response.json({ avgRating, ratingCount });
}
