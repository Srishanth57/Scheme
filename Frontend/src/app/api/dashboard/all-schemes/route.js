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

const generalSchemeModelMap = {
  CasteSchemes: CasteSchemes,
  ChildrenSchemes: ChildrenSchemes,
  DisabledSchemes: DisabledSchemes,
  AgricultureScheme: AgricultureScheme,
  HealthCareSchemes: HealthCareSchemes,
};

const GeneralSchemes = [
  "CasteSchemes",
  "ChildrenSchemes",
  "DisabledSchemes",
  "AgricultureScheme",
  "HealthCareSchemes",
];

export async function GET() {
  try {
    await connectDB();

    const schemesPromises = [];

    // Fetch from Government Collections
    allowedGovCollections.forEach((element) => {
      const model = getSchemeModel(element);
      schemesPromises.push(model.find({}).lean()); // .lean() for faster fetching if you don't need Mongoose documents
    });

    // Fetch from General Schemes
    GeneralSchemes.forEach((element) => {
      const model = generalSchemeModelMap[element];
      if (model) {
        schemesPromises.push(model.find({}).lean()); // .lean() for faster fetching
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(schemesPromises);

    // Flatten the array of arrays into a single array
    const allSchemes = results.flat();

    console.log(`Fetched ${allSchemes.length} schemes in total.`);

    return new Response(JSON.stringify(allSchemes), {
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
