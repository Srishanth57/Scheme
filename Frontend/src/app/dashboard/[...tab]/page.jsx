import AgricultureScheme from "../components/AgricultureScheme";
import AllSchemes from "../components/AllSchemes";
import DisabledScheme from "../components/DisabledScheme";
import HealthCareScheme from "../components/HealthCareScheme";
import ChildrenScheme from "../components/ChildrenScheme";
import CasteScheme from "../components/CasteScheme";
import GovernmentSheetSchemes from "./GovernmentSchemes/Schemes";
import NationalHealthMission from "./GovernmentSchemes/NationalHealthMission";
import KeralaWaterAuthority from "./GovernmentSchemes/KeralaWaterAuthority";
import LifeMission from "./GovernmentSchemes/LifeMission";
import PoliceDepartment from "./GovernmentSchemes/PoliceDepartment";
import Cooperative from "./GovernmentSchemes/Cooperative";
import NotFound from "app/not-found";

const tabComponents = {
  agriculture: AgricultureScheme,
  allScheme: AllSchemes,
  disabled: DisabledScheme,
  healthCare: HealthCareScheme,
  "governmentSchemes/scheme": GovernmentSheetSchemes,
  "governmentSchemes/nationHealth": NationalHealthMission,
  "governmentSchemes/keralaWaterAuthority": KeralaWaterAuthority,
  "governmentSchemes/lifeMission": LifeMission,
  "governmentSchemes/policeDepartment": PoliceDepartment,
  "governmentSchemes/Cooperative": Cooperative,

  caste: CasteScheme,
  children: ChildrenScheme,
};

export default async function Page({ params }) {
  const { tab } = await params;
  if (tab.length > 1) {
    const route = tab.join("/");
    const Page = tabComponents[route] || NotFound;
    return <Page />;
  }
  const TabComponent = tabComponents[tab] || NotFound;
  return <TabComponent />;
}
