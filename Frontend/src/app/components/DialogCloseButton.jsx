import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogCloseButton({ scheme }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          View More{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md font-serif min-md:max-w-10/12 min-md:h-2/3">
        <DialogHeader>
          <DialogTitle>{scheme.name}</DialogTitle>
          <DialogDescription className="font-sans">
            <span className="font-bold">For: </span>
            {scheme.targetAudience} <br />
            <span className="font-bold">Benefits:</span> {scheme.benefits}
            <br />
            <span className="font-bold">Category:</span> {scheme.category}
            <br />
            <span className="font-bold">Implementing Agency:</span> {scheme.implementingAgency} <br />
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <h1 className="text-lg font-semibold ">Eligibility</h1>
          <DialogDescription asChild>
            <div>
              <ul className="list-none font-sans">
                <li>
                  <span className="font-bold">Age Group:</span>
                  {scheme.ageGroup}
                </li>
                <li>
                  <span className="font-bold">Gender:</span>
                  {scheme.gender}
                </li>
                <li>
                  <span className="font-bold">Income Level:</span>
                  {scheme.incomeLevel}
                </li>

                <li>
                  <span className="font-bold">Category:</span>
              
                  {scheme.socialCategory.length > 0
                    ? scheme.socialCategory.map(
                        (eachCategory) => ` ${eachCategory}, `
                      )
                    : ` Not specified`}
                </li>
              </ul>
              <p className="font-bold inline">Link: </p>
              <a href={scheme.link} target="_blank">
                {scheme.link}
              </a>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
