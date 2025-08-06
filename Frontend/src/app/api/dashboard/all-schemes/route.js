import connectDB from "lib/db";
import AgricultureScheme from "modals/Agriculture";
import CasteSchemes from "modals/Caste";
import ChildrenSchemes from "modals/Children";
import DisabledSchemes from "modals/Disabled";
import HealthCareSchemes from "modals/HealthCare";
import ElderlySchemes from "modals/Elderly";
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
  ElderlySchemes: ElderlySchemes,
};

const GeneralSchemes = [
  "CasteSchemes",
  "ChildrenSchemes",
  "DisabledSchemes",
  "AgricultureScheme",
  "HealthCareSchemes",
  "ElderlySchemes",
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
