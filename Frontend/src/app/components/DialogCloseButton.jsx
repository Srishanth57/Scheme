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
import StarRating from "./UserUpdateRating";

export function DialogCloseButton({ scheme }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full relative">
          View More
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md font-serif min-md:max-w-10/12 min-md:h-2/3">
        <DialogHeader>
          <DialogTitle>{scheme.name}</DialogTitle>
          <DialogDescription className="font-sans">
            {/* Government Schemes Rendering Criteria */}
            {scheme.implementedBy && (
              <>
                <span className="font-bold">
                  Implemented By (GoI/GoK/LSGI):
                </span>
                {scheme.implementedBy.join(", ")}
                <br />
              </>
            )}
            {scheme.objective && (
              <>
                <span className="font-bold">Objective:</span>
                {scheme.objective}
                <br />
              </>
            )}
            {scheme.targetBeneficiaries && (
              <>
                <span className="font-bold">Target Beneficiaries:</span>
                {scheme.targetBeneficiaries}
                <br />
              </>
            )}
            {scheme.eligibilityCriterias && (
              <>
                <span className="font-bold">Eligibility Criteria :</span>

                <span className="list-decimal pl-7">
                  {scheme.eligibilityCriterias
                    .split(";")
                    .map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                </span>
                <br />
              </>
            )}
            {scheme.benefitsProvided && (
              <>
                <span className="font-bold">
                  Benefits/Assistance Provided :
                </span>
                <span className="list-decimal pl-7">
                  {scheme.benefitsProvided.split(";").map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </span>
                <br />
              </>
            )}
            {scheme.applicationProcess && (
              <>
                <span className="font-bold">Application Process :</span>

                {scheme.applicationProcess}
                <br />
              </>
            )}
            {scheme.contact && (
              <>
                <span className="font-bold">
                  Contact Person/Designation/Phone/Email :
                </span>

                <span className="list-decimal pl-7">
                  {scheme.contact.split(";").map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </span>
                <br />
              </>
            )}

            {/* Other Schemes Rendering Criteria */}
            {scheme.targetAudience && (
              <>
                <span className="font-bold">For: </span>
                {scheme.targetAudience}
                <br />
              </>
            )}
            {scheme.benefits && (
              <>
                <span className="font-bold">Benefits ( UPTO/RS ): </span>
                {scheme.benefits}
                <br />
              </>
            )}
            {scheme.category && (
              <>
                <span className="font-bold">Category:</span> {scheme.category}
                <br />
              </>
            )}
            {scheme.implementingAgency && (
              <>
                <span className="font-bold">Implementing Agency:</span>
                {scheme.implementingAgency}
                <br />
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <DialogDescription asChild>
            <div>
              <div className="font-sans">
                {scheme.ageGroup && (
                  <>
                    <span className="font-bold">Age Group:</span>
                    {scheme.ageGroup}
                    <br />
                  </>
                )}

                {scheme.gender && (
                  <>
                    <span className="font-bold">Gender:</span> {scheme.gender}
                    <br />
                  </>
                )}

                {scheme.incomeLevel && (
                  <>
                    <span className="font-bold">Income Level:</span>
                    {scheme.incomeLevel}
                    <br />
                  </>
                )}
                {scheme.documents_required && (
                  <>
                    <span className="font-bold">Documents Required: </span>
                    {scheme.documents_required}
                    <br />
                  </>
                )}
                {scheme.eligibility && (
                  <>
                    <span className="font-bold">Eligible: </span>
                    {scheme.eligibility}
                    <br />
                  </>
                )}
                {scheme.socialCategory && scheme.socialCategory.length > 0 && (
                  <>
                    <span className="font-bold">Social Category:</span>
                    {scheme.socialCategory.map((eachCategory, index) => (
                      <span key={index}>
                        {eachCategory}
                        {index < scheme.socialCategory.length - 1 && ","}
                      </span>
                    ))}
                    <br />
                  </>
                )}
              </div>

              {scheme.link && (
                <div>
                  <p className="font-bold inline">Link: </p>
                  <Link href={scheme.link} target="_blank">
                    {scheme.link}
                  </Link>
                  <br />
                </div>
              )}
              {scheme.application_process && (
                <div className="gap-1 flex">
                  <p className="font-bold inline">
                    Application Process / Link:{" "}
                  </p>
                  {scheme.application_process.process_description}
                  {!(scheme.application_process.link === "N/A") && (
                    <Link href={scheme.application_process} target="_blank">
                      / {scheme.application_process.link}
                    </Link>
                  )}
                
                </div>
              )}

              <h1 className="font-bold inline">Ratings: </h1>
              <StarRating
                count={scheme.ratings.count}
                avgRating={scheme.ratings.avgRating}
                schemeId={scheme._id}
              />
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
