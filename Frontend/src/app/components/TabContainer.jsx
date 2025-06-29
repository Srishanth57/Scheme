import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  usePathname, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function TabsDemo({ handleTabsTrigger }) {
  const router = useRouter();
  const pathname = usePathname()
  const currentTab = pathname.split("/").pop() || "allScheme";
  const tabsList = [
    { displayName: "All Schemes", key: "allScheme" },
    { displayName: "Agriculture", key: "agriculture" },
    { displayName: "Health-care", key: "healthCare" },
    { displayName: "Disabled", key: "disabled" },
    { displayName: "National", key: "national" },
    { displayName: "Caste", key: "caste" },
    { displayName: "Children", key: "children" },
  ];

  const handleTabClick = (value) => {
    handleTabsTrigger(value);
    router.push(`/dashboard/${value}`);
  };
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue={currentTab}>
        <TabsList className="gap-5 m-5 mt-0">
          {tabsList.map((tabDetails) => (
            <TabsTrigger
              key={tabDetails.key}
              value={tabDetails.key}
              onClick={() => handleTabClick(tabDetails.key)}
            >
              {tabDetails.displayName}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

