"use client";
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

export function DialogCloseButton({ scheme, currentLang }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full relative">
          {currentLang === "ml" ? "കൂടുതൽ കാണുക" : "View More"}
        </Button>
      </DialogTrigger>{" "}
      <DialogContent className="sm:max-w-md font-serif min-md:max-w-10/12 min-md:h-2/3">
        <DialogHeader>
          <DialogTitle>
            {typeof scheme.name === "string"
              ? scheme.name
              : scheme.name?.[currentLang]}
          </DialogTitle>
          <DialogDescription className="font-sans">
            {/* Government Schemes Rendering Criteria */}
            {scheme.implementedBy && (
              <>
                <span className="font-bold">
                  {currentLang === "ml"
                    ? "നടപ്പിലാക്കിയത് (GoI/GoK/LSGI):"
                    : "Implemented By (GoI/GoK/LSGI):"}
                </span>
                {Array.isArray(scheme.implementedBy)
                  ? scheme.implementedBy
                      .map((agency) =>
                        typeof agency === "string"
                          ? agency
                          : agency?.[currentLang] || agency?.en
                      )
                      .join(", ")
                  : typeof scheme.implementingAgency === "string"
                  ? scheme.implementingAgency
                  : scheme.implementedBy?.[currentLang].map(each => each).join(", ") ||
                    scheme.implementedBy?.en}
                <br />
              </>
            )}
            {scheme.objective && (
              <>
                <span className="font-bold">
                  {currentLang === "ml" ? "ലക്ഷ്യം:" : "Objective:"}
                </span>
                {scheme.objective?.[currentLang]}
                <br />
              </>
            )}
            {scheme.targetBeneficiaries && (
              <>
                <span className="font-bold">
                  {currentLang === "ml"
                    ? "ലക്ഷ്യമിടുന്ന ഗുണഭോക്താക്കൾ:"
                    : "Target Beneficiaries:"}
                </span>{" "}
                {scheme.targetBeneficiaries?.[currentLang]}
                <br />
              </>
            )}
            {scheme.eligibilityCriterias && (
              <>
                <span className="font-bold">
                  {currentLang === "ml"
                    ? "അർഹതാ മാനദണ്ഡങ്ങൾ :"
                    : "Eligibility Criteria :"}
                </span>
                <span className="list-decimal pl-7">
                  {scheme.eligibilityCriterias?.[currentLang]
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
                  {currentLang === "ml"
                    ? "നൽകുന്ന ആനുകൂല്യങ്ങൾ/സഹായം :"
                    : "Benefits/Assistance Provided :"}
                </span>
                <span className="list-decimal pl-7">
                  {scheme.benefitsProvided?.[currentLang]
                    .split(";")
                    .map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                </span>
                <br />
              </>
            )}
            {scheme.applicationProcess && (
              <>
                <span className="font-bold">
                  {currentLang === "ml"
                    ? "അപേക്ഷാ പ്രക്രിയ :"
                    : "Application Process :"}
                </span>
                {scheme.applicationProcess?.[currentLang]}
                <br />
              </>
            )}
            {scheme.contact && (
              <>
                <span className="font-bold">
                  {currentLang === "ml"
                    ? "ബന്ധപ്പെടാനുള്ള വ്യക്തി/പദവി/ഫോൺ/ഇമെയിൽ :"
                    : "Contact Person/Designation/Phone/Email :"}
                </span>
                <span className="list-decimal pl-7">
                  {scheme.contact?.[currentLang]
                    .split(";")
                    .map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                </span>
                <br />
              </>
            )}

            {/* Other Schemes Rendering Criteria */}
            {scheme.targetAudience && (
              <>
                <span className="font-bold">
                  {currentLang === "ml" ? "വേണ്ടി: " : "For: "}
                </span>
                {scheme.targetAudience?.[currentLang]}
                <br />
              </>
            )}
            {scheme.benefits && (
              <>
                <span className="font-bold">
                  {currentLang === "ml"
                    ? "ആനുകൂല്യങ്ങൾ (രൂപ വരെ) :"
                    : "Benefits ( UPTO/RS ): "}
                </span>
                {scheme.benefits?.[currentLang]}
                <br />
              </>
            )}
            {scheme.category && (
              <>
                <span className="font-bold">
                  {currentLang === "ml" ? "വിഭാഗം:" : "Category:"}
                </span>{" "}
                {scheme.category?.[currentLang]}
                <br />
              </>
            )}
            {scheme.implementingAgency && (
              <>
                <span className="font-bold">
                  {currentLang === "ml"
                    ? "നടപ്പാക്കുന്ന ഏജൻസി:"
                    : "Implementing Agency:"}
                </span>
                {scheme.implementingAgency?.[currentLang]}
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
                    <span className="font-bold">
                      {currentLang === "ml" ? "പ്രായപരിധി:" : "Age Group:"}
                    </span>
                    {scheme.ageGroup?.[currentLang]}
                    <br />
                  </>
                )}

                {scheme.gender && (
                  <>
                    <span className="font-bold">
                      {currentLang === "ml" ? "ലിംഗഭേദം:" : "Gender:"}
                    </span>{" "}
                    {scheme.gender?.[currentLang]}
                    <br />
                  </>
                )}

                {scheme.incomeLevel && (
                  <>
                    <span className="font-bold">
                      {currentLang === "ml" ? "വരുമാന നില:" : "Income Level:"}
                    </span>
                    {scheme.incomeLevel?.[currentLang]}
                    <br />
                  </>
                )}
                {scheme.documents_required && (
                  <>
                    <span className="font-bold">
                      {currentLang === "ml"
                        ? "ആവശ്യമുള്ള രേഖകൾ: "
                        : "Documents Required: "}
                    </span>
                    {scheme.documents_required?.[currentLang]}
                    <br />
                  </>
                )}
                {scheme.eligibility && (
                  <>
                    <span className="font-bold">
                      {currentLang === "ml" ? "അർഹതപ്പെട്ടവർ: " : "Eligible: "}
                    </span>
                    {scheme.eligibility?.[currentLang]}
                    <br />
                  </>
                )}
                {scheme.socialCategory && scheme.socialCategory.length > 0 && (
                  <>
                    <span className="font-bold">
                      {currentLang === "ml"
                        ? "സാമൂഹിക വിഭാഗം:"
                        : "Social Category:"}
                    </span>
                    {/* Ensure socialCategory is handled for multilingual objects as well */}
                    {Array.isArray(scheme.socialCategory)
                      ? scheme.socialCategory.map((eachCategory, index) => (
                          <span key={index}>
                            {typeof eachCategory === "string"
                              ? eachCategory
                              : eachCategory?.[currentLang] || eachCategory?.en}
                            {index < scheme.socialCategory.length - 1 && ","}
                          </span>
                        ))
                      : scheme.socialCategory?.[currentLang] ||
                        scheme.socialCategory?.en}
                    <br />
                  </>
                )}
              </div>

              {scheme.link && (
                <div>
                  <p className="font-bold inline">
                    {currentLang === "ml" ? "ലിങ്ക്: " : "Link: "}
                  </p>
                  <Link href={scheme.link} target="_blank">
                    {scheme.link}
                  </Link>
                  <br />
                </div>
              )}
              {scheme.application_process && (
                <div className="gap-1 flex">
                  <p className="font-bold inline">
                    {currentLang === "ml"
                      ? "അപേക്ഷാ പ്രക്രിയ / ലിങ്ക്: "
                      : "Application Process / Link: "}
                  </p>
                  {
                    scheme.application_process.process_description?.[
                      currentLang
                    ]
                  }
                  {!(scheme.application_process.link === "N/A") && (
                    <Link
                      href={scheme.application_process.link}
                      target="_blank"
                    >
                      / {scheme.application_process.link}
                    </Link>
                  )}
                </div>
              )}

              <h1 className="font-bold inline">
                {currentLang === "ml" ? "റേറ്റിംഗുകൾ: " : "Ratings: "}
              </h1>
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
              {currentLang === "ml" ? "അടയ്ക്കുക" : "Close"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
