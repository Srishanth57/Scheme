import connectDB from "lib/db";
import UserRating from "models/UserRating";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const segments = params.schemeId;
    const category = segments[0];
    const schemeId = segments[1];

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !schemeId || !category) {
      return new Response(
        JSON.stringify({ message: "Missing required parameters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const existingRating = await UserRating.findOne({ userId, schemeId });

    if (existingRating) {
      return new Response(
        JSON.stringify({
          hasRated: true,
          rating: existingRating.rating,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ hasRated: false }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error checking rating", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
