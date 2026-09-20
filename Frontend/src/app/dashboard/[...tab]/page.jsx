import connectDB from "lib/db";
import Scheme from "models/Scheme"; // Your new unified model
import { getSchemeModel } from "lib/govtSchemeModel";
import SchemeDisplay from "shared/components/main-components/SchemeDisplay";
import NotFound from "app/not-found";

// Only need to map the complex dynamic government collections now
const govCollectionMap = {
  "governmentSchemes/scheme": "Government_Schemes",
  "governmentSchemes/nationHealth": "Government_NationalHealthMission",
  "governmentSchemes/keralaWaterAuthority": "Government_KeralaWaterAuthority",
  "governmentSchemes/lifeMission": "Government_LifeMission",
  "governmentSchemes/policeDepartment": "Government_PoliceDepartment",
  "governmentSchemes/cooperative": "Government_Cooperative",
};

async function fetchSchemesData(route) {
  await connectDB();

  // 1. Handle "All Schemes" tab (Fetch everything)
  if (route === "allScheme") {
    const standardSchemes = await Scheme.find({}).lean();
    
    // Fetch from all government collections
    const govPromises = Object.values(govCollectionMap).map(collectionName => 
      getSchemeModel(collectionName).find({}).lean()
    );
    const govSchemes = await Promise.all(govPromises);
    
    return [...standardSchemes, ...govSchemes.flat()];
  }

  // 2. Handle Government Schemes
  if (govCollectionMap[route]) {
    const model = getSchemeModel(govCollectionMap[route]);
    return await model.find({}).lean();
  }

  // 3. Handle Standard General Schemes (e.g., 'agriculture', 'caste')
  // We simply query the unified collection by the schemeType!
  const schemes = await Scheme.find({ schemeType: route }).lean();
  
  return schemes.length > 0 ? schemes : null;
}

export default async function Page({ params }) {
  const { tab } = await params;
  const route = tab.join("/");

  const schemesData = await fetchSchemesData(route);

  if (!schemesData) {
    return <NotFound />;
  }

  const serializedData = JSON.parse(JSON.stringify(schemesData));
  return <SchemeDisplay scheme={serializedData} />;
}