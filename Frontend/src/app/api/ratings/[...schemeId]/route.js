import UserRating from "models/UserRating";

import connectDB from "lib/db";
import CasteSchemes from "models/Caste";
import ChildrenSchemes from "models/Children";
import DisabledSchemes from "models/Disabled";
import AgricultureSchemes from "models/Agriculture";
import HealthCareSchemes from "models/HealthCare";
import { getSchemeModel } from "lib/govtSchemeModel";

const allowedGovCollections = [
  { modelName: "Government_Cooperative", pathname: "Cooperative" },
  {
    modelName: "Government_KeralaWaterAuthority",
    pathname: "keralaWaterAuthority",
  },
  { modelName: "Government_LifeMission", pathname: "lifeMission" },
  { modelName: "Government_NationalHealthMission", pathname: "cooperative" },
  { modelName: "Government_PoliceDepartment", pathname: "policeDepartment" },
  { modelName: "Government_Schemes", pathname: "scheme" },
];

const modelMap = {
  caste: CasteSchemes,
  children: ChildrenSchemes,
  disabled: DisabledSchemes,
  agriculture: AgricultureSchemes,
  healthcare: HealthCareSchemes,
};

export async function POST(request, { params }) {
  try {
    await connectDB();
    const segments = params.schemeId;
    const category = segments[0];

    const schemeId = segments[1];
    let scheme = null;
    let model = null;
    model = modelMap[category];
    console.log(model);

    if (!model) {
      console.log("entered model");
      console.log(category);
      const updatedCategory = allowedGovCollections.find(
        (each) => category === each.pathname
      );
      console.log(updatedCategory.modelName);

      model = getSchemeModel(updatedCategory.modelName); // dynamic model from collection name
      scheme = await model.findById(schemeId);
    } else {
      scheme = await model.findById(schemeId);
    }
    const { rating, userId } = await request.json();

    if (!scheme) {
      return new Response(JSON.stringify({ message: "Scheme not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const existing = await UserRating.findOne({ userId, schemeId });
    let updatedAvg = 0;

    if (existing) {
      const oldUserRating = existing.rating;
      const oldAvg = scheme.ratings?.avgRating || 0;
      const count = scheme.ratings?.count || 1;

      // Reverse old rating from avg and apply new one
      updatedAvg = (oldAvg * count - oldUserRating + rating) / count;

      scheme.ratings = { avgRating: updatedAvg, count };
      await scheme.save();

      existing.rating = rating;
      await existing.save();
    } else {
      // Update scheme's avgRating and count

      const oldAvg = scheme.ratings?.avgRating || 0;
      const oldCount = scheme.ratings?.count || 0;

      const newCount = oldCount + 1;
      const newAvg = (oldAvg * oldCount + rating) / newCount;

      scheme.ratings = {
        avgRating: newAvg,
        count: newCount,
      };

      await scheme.save();

      // Save user-specific rating
      await new UserRating({ userId, schemeId, category, rating }).save();
    }

    return new Response(
      JSON.stringify({
        message: "Rating Updated/submitted successfully",
        updatedRatings: scheme.ratings,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
