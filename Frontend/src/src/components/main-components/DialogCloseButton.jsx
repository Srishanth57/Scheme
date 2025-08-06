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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Target,
  Users,
  FileText,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Building,
  Star,
  UserCheck,
  Shield,
  Globe,
  Award,
  Eye,
} from "lucide-react";
import Link from "next/link";
import StarRating from "./UserUpdateRating";

export function DialogCloseButton({ scheme, currentLang }) {
  const InfoRow = ({ icon: Icon, label, children, className = "" }) => (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon className="h-4 w-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        )}
        <div className="flex-1">
          <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">
            {label}
          </span>
          <div className="mt-1 text-emerald-700 dark:text-emerald-400 font-medium text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full group hover:bg-slate-100 hover:text-slate-900
               dark:hover:bg-slate-800 dark:hover:text-slate-100
               transition-all duration-200"
        >
          <Eye className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          <span>{currentLang === "ml" ? "കൂടുതൽ കാണുക" : "View More"}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[98vw] max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="space-y-4 pb-4 border-b">
          <DialogTitle className="text-xl font-bold leading-tight pr-8 flex items-start gap-3">
            <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            {typeof scheme.name === "string"
              ? scheme.name
              : scheme.name?.[currentLang]}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-1">
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-lg">
              <CardContent className="p-5">
                <DialogDescription className="space-y-4">
                  {/* Government Schemes Rendering Criteria */}
                  {scheme.implementedBy && (
                    <InfoRow
                      icon={Building}
                      label={
                        currentLang === "ml"
                          ? "നടപ്പിലാക്കിയത് (GoI/GoK/LSGI):"
                          : "Implemented By (GoI/GoK/LSGI):"
                      }
                    >
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
                        : scheme.implementedBy?.[currentLang]
                            ?.map((each) => each)
                            .join(", ") || scheme.implementedBy?.en}
                    </InfoRow>
                  )}

                  {scheme.objective && (
                    <InfoRow
                      icon={Target}
                      label={currentLang === "ml" ? "ലക്ഷ്യം:" : "Objective:"}
                    >
                      {scheme.objective?.[currentLang]}
                    </InfoRow>
                  )}

                  {scheme.targetBeneficiaries && (
                    <InfoRow
                      icon={Users}
                      label={
                        currentLang === "ml"
                          ? "ലക്ഷ്യമിടുന്ന ഗുണഭോക്താക്കൾ:"
                          : "Target Beneficiaries:"
                      }
                    >
                      {scheme.targetBeneficiaries?.[currentLang]}
                    </InfoRow>
                  )}

                  {scheme.eligibilityCriterias && (
                    <InfoRow
                      icon={FileText}
                      label={
                        currentLang === "ml"
                          ? "അർഹതാ മാനദണ്ഡങ്ങൾ :"
                          : "Eligibility Criteria :"
                      }
                    >
                      <ul className="list-none space-y-2 mt-2">
                        {scheme.eligibilityCriterias?.[currentLang]
                          .split(";")
                          .map((value, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{value}</span>
                            </li>
                          ))}
                      </ul>
                    </InfoRow>
                  )}

                  {scheme.benefitsProvided && (
                    <InfoRow
                      icon={DollarSign}
                      label={
                        currentLang === "ml"
                          ? "നൽകുന്ന ആനുകൂല്യങ്ങൾ/സഹായം :"
                          : "Benefits/Assistance Provided :"
                      }
                    >
                      <ul className="list-none space-y-2 mt-2">
                        {scheme.benefitsProvided?.[currentLang]
                          .split(";")
                          .map((value, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{value}</span>
                            </li>
                          ))}
                      </ul>
                    </InfoRow>
                  )}

                  {scheme.applicationProcess && (
                    <InfoRow
                      icon={FileText}
                      label={
                        currentLang === "ml"
                          ? "അപേക്ഷാ പ്രക്രിയ :"
                          : "Application Process :"
                      }
                    >
                      {scheme.applicationProcess?.[currentLang]}
                    </InfoRow>
                  )}

                  {scheme.contact && (
                    <InfoRow
                      icon={Phone}
                      label={
                        currentLang === "ml"
                          ? "ബന്ധപ്പെടാനുള്ള വ്യക്തി/പദവി/ഫോൺ/ഇമെയിൽ :"
                          : "Contact Person/Designation/Phone/Email :"
                      }
                    >
                      <ul className="list-none space-y-2 mt-2">
                        {scheme.contact?.[currentLang]
                          .split(";")
                          .map((value, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{value}</span>
                            </li>
                          ))}
                      </ul>
                    </InfoRow>
                  )}

                  {/* Other Schemes Rendering Criteria */}
                  {scheme.targetAudience && (
                    <InfoRow
                      icon={Users}
                      label={currentLang === "ml" ? "വേണ്ടി: " : "For: "}
                    >
                      {scheme.targetAudience?.[currentLang]}
                    </InfoRow>
                  )}

                  {scheme.benefits && (
                    <InfoRow
                      icon={DollarSign}
                      label={
                        currentLang === "ml"
                          ? "ആനുകൂല്യങ്ങൾ (രൂപ വരെ) :"
                          : "Benefits ( UPTO/RS ): "
                      }
                    >
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 rounded-md border border-emerald-200 dark:border-emerald-800 font-semibold">
                        {scheme.benefits?.[currentLang]}
                      </div>
                    </InfoRow>
                  )}

                  {scheme.category && (
                    <InfoRow
                      icon={Shield}
                      label={currentLang === "ml" ? "വിഭാഗം:" : "Category:"}
                    >
                      <Badge variant="secondary" className="text-xs px-3 py-1">
                        {scheme.category?.[currentLang]}
                      </Badge>
                    </InfoRow>
                  )}

                  {scheme.implementingAgency && (
                    <InfoRow
                      icon={Building}
                      label={
                        currentLang === "ml"
                          ? "നടപ്പാക്കുന്ന ഏജൻസി:"
                          : "Implementing Agency:"
                      }
                    >
                      {scheme.implementingAgency?.[currentLang]}
                    </InfoRow>
                  )}
                </DialogDescription>
              </CardContent>
            </Card>

            {/* Additional Details Card */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-lg">
              <CardContent className="p-5">
                <DialogDescription className="space-y-4">
                  {scheme.ageGroup && (
                    <InfoRow
                      icon={Calendar}
                      label={
                        currentLang === "ml" ? "പ്രായപരിധി:" : "Age Group:"
                      }
                    >
                      {scheme.ageGroup?.[currentLang]}
                    </InfoRow>
                  )}

                  {scheme.gender && (
                    <InfoRow
                      icon={Users}
                      label={currentLang === "ml" ? "ലിംഗഭേദം:" : "Gender:"}
                    >
                      <Badge variant="outline" className="text-xs">
                        {scheme.gender?.[currentLang]}
                      </Badge>
                    </InfoRow>
                  )}

                  {scheme.incomeLevel && (
                    <InfoRow
                      icon={DollarSign}
                      label={
                        currentLang === "ml" ? "വരുമാന നില:" : "Income Level:"
                      }
                    >
                      {scheme.incomeLevel?.[currentLang]}
                    </InfoRow>
                  )}

                  {scheme.documents_required && (
                    <InfoRow
                      icon={FileText}
                      label={
                        currentLang === "ml"
                          ? "ആവശ്യമുള്ള രേഖകൾ: "
                          : "Documents Required: "
                      }
                    >
                      {scheme.documents_required?.[currentLang]}
                    </InfoRow>
                  )}

                  {scheme.eligibility && (
                    <InfoRow
                      icon={UserCheck}
                      label={
                        currentLang === "ml" ? "അർഹതപ്പെട്ടവർ: " : "Eligible: "
                      }
                    >
                      {scheme.eligibility?.[currentLang]}
                    </InfoRow>
                  )}

                  {scheme.socialCategory &&
                    scheme.socialCategory.length > 0 && (
                      <InfoRow
                        icon={Shield}
                        label={
                          currentLang === "ml"
                            ? "സാമൂഹിക വിഭാഗം:"
                            : "Social Category:"
                        }
                      >
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Array.isArray(scheme.socialCategory) ? (
                            scheme.socialCategory.map((eachCategory, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {typeof eachCategory === "string"
                                  ? eachCategory
                                  : eachCategory?.[currentLang] ||
                                    eachCategory?.en}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              {scheme.socialCategory?.[currentLang] ||
                                scheme.socialCategory?.en}
                            </Badge>
                          )}
                        </div>
                      </InfoRow>
                    )}
                </DialogDescription>
              </CardContent>
            </Card>

            {/* Links and Application Process */}
            {(scheme.link || scheme.application_process) && (
              <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-lg">
                <CardContent className="p-5">
                  <DialogDescription className="space-y-4">
                    {scheme.link && (
                      <InfoRow
                        icon={Globe}
                        label={currentLang === "ml" ? "ലിങ്ക്: " : "Link: "}
                      >
                        <div className="bg-slate-800 dark:bg-slate-900 rounded-lg p-3 border border-slate-600">
                          <Link
                            href={scheme.link}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors text-sm group"
                          >
                            <ExternalLink className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            <span className="break-all">{scheme.link}</span>
                          </Link>
                        </div>
                      </InfoRow>
                    )}

                    {scheme.application_process && (
                      <InfoRow
                        icon={FileText}
                        label={
                          currentLang === "ml"
                            ? "അപേക്ഷാ പ്രക്രിയ / ലിങ്ക്: "
                            : "Application Process / Link: "
                        }
                      >
                        <div className="space-y-3">
                          <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                            {
                              scheme.application_process.process_description?.[
                                currentLang
                              ]
                            }
                          </div>
                          {!(scheme.application_process.link === "N/A") && (
                            <div className="bg-slate-800 dark:bg-slate-900 rounded-lg p-3 border border-slate-600">
                              <Link
                                href={scheme.application_process.link}
                                target="_blank"
                                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors text-sm group"
                              >
                                <ExternalLink className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                <span className="break-all">
                                  {scheme.application_process.link}
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </InfoRow>
                    )}
                  </DialogDescription>
                </CardContent>
              </Card>
            )}

            {/* Ratings Card */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-lg">
              <CardContent className="p-5">
                <InfoRow
                  icon={Star}
                  label={currentLang === "ml" ? "റേറ്റിംഗുകൾ: " : "Ratings: "}
                >
                  <div className="flex items-center gap-4 mt-2">
                    <StarRating
                      count={scheme.ratings.count}
                      avgRating={scheme.ratings.avgRating}
                      schemeId={scheme._id}
                    />
                  </div>
                </InfoRow>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-1" />

        <DialogFooter className="pt-4 bg-muted/20">
          <DialogClose asChild>
            <Button variant="secondary" className="min-w-28 h-10">
              {currentLang === "ml" ? "അടയ്ക്കുക" : "Close"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
