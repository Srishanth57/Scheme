import connectDB from "lib/db";
import AgricultureScheme from "models/Agriculture";
import CasteSchemes from "models/Caste";
import ChildrenSchemes from "models/Children";
import DisabledSchemes from "models/Disabled";
import HealthCareSchemes from "models/HealthCare";
import { getSchemeModel } from "lib/govtSchemeModel";

// Separate the lists
const allowedGovCollections = [
  "Government_Cooperative",
  "Government_KeralaWaterAuthority",
  "Government_LifeMission",
  "Government_NationalHealthMission",
  "Government_PoliceDepartment",
  "Government_Schemes",
];

const modelMap = {
  caste: CasteSchemes,
  children: ChildrenSchemes,
  disabled: DisabledSchemes,
  agriculture: AgricultureScheme,
  healthcare: HealthCareSchemes,
};

export async function GET(request, { params }) {
  try {
    await connectDB();

    const segments = params.scheme;
    const category = segments.join("_");

    let schemes = [];

    // Government collections (use shared schema)
    if (allowedGovCollections.includes(category)) {
      const model = getSchemeModel(category); // dynamic model from collection name
      schemes = await model.find({});
      console.log(schemes)
    }
    // Other static categories using modelMap
    else if (modelMap[category]) {
      const model = modelMap[category];
      schemes = await model.find({});
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid category provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(schemes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data from DB:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch schemes.",
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
