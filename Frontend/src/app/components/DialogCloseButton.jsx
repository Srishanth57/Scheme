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
import Link from "next/link";

export function DialogCloseButton({ scheme }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View More </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md font-serif">
        <DialogHeader>
          <DialogTitle>{scheme.name}</DialogTitle>
          <DialogDescription className="font-sans">
            <span className="font-bold">For: </span>
            {scheme.forWhom} <br />
            <span className="font-bold">Objective:</span> {scheme.objective}{" "}
            <br />
            <span className="font-bold">Department:</span> {scheme.department}
            <br />
            <span className="font-bold">Support:</span> {scheme.support} <br />
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <h1 className="text-lg font-semibold ">Eligibility</h1>
          <DialogDescription>
            <ul className="list-none font-sans">
              <li>
                <span className="font-bold">Age Group:</span>{" "}
                {scheme.eligibility.ageGroup["label"]}
              </li>
              <li>
                <span className="font-bold">Gender:</span>{" "}
                {scheme.eligibility.gender}
              </li>
              <li>
                <span className="font-bold">Income Level:</span>{" "}
                {scheme.eligibility.incomeLevel}
              </li>

              <li>
                <span className="font-bold">Category:</span>
                {scheme.eligibility.category.length > 0
                  ? scheme.eligibility.category.map(
                      (eachCategory) => ` ${eachCategory} `
                    )
                  : ` Not specified`}
              </li>
            </ul>
            <p className="font-bold inline">Link: </p>
           <a href={scheme.link}>{scheme.link}</a>  
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
