import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, Check, ChevronDown } from "lucide-react";
import { useDashboardContext } from "app/dashboard/layout";

// 1. New keyword data integrated and formatted with a unique 'key' for each item.
const keywords = [
  { key: "10_cow_unit", label: { en: "10 cow unit", ml: "10 പശു യൂണിറ്റ്" } },
  { key: "2_cow_unit", label: { en: "2 cow unit", ml: "2 പശു യൂണിറ്റ്" } },
  { key: "5_cow_unit", label: { en: "5 cow unit", ml: "5 പശു യൂണിറ്റ്" } },
  { key: "aardram", label: { en: "aardram", ml: "ആർദ്രം" } },
  { key: "aashadhara", label: { en: "aashadhara", ml: "ആശാധാര" } },
  {
    key: "advanced_facility",
    label: { en: "advanced facility", ml: "അത്യാധുനിക സൗകര്യം" },
  },
  { key: "amrut", label: { en: "amrut", ml: "അമൃത്" } },
  { key: "artisan", label: { en: "artisan", ml: "തൊഴിലാളി" } },
  { key: "asha", label: { en: "asha", ml: "ആശ" } },
  { key: "assistance", label: { en: "assistance", ml: "സഹായം" } },
  { key: "atrocities", label: { en: "atrocities", ml: "അതിക്രമം" } },
  { key: "automation", label: { en: "automation", ml: "ഓട്ടോമേഷൻ" } },
  { key: "awareness", label: { en: "awareness", ml: "ബോധവൽക്കരണം" } },
  { key: "barren_land", label: { en: "barren land", ml: "തരിശുഭൂമി" } },
  { key: "bhoomika", label: { en: "bhoomika", ml: "ഭൂമിക" } },
  { key: "block_level", label: { en: "block level", ml: "ബ്ലോക്ക് തലം" } },
  { key: "calf_rearing", label: { en: "calf rearing", ml: "കിടാരി വളർത്തൽ" } },
  { key: "cattle_feed", label: { en: "cattle feed", ml: "കാലിത്തീറ്റ" } },
  { key: "cattle_shed", label: { en: "cattle shed", ml: "തൊഴുത്ത്" } },
  {
    key: "cattle_trading",
    label: { en: "cattle trading", ml: "കന്നുകാലി വ്യാപാരം" },
  },
  { key: "children", label: { en: "children", ml: "കുട്ടികൾ" } },
  {
    key: "children_safety",
    label: { en: "children safety", ml: "ബാല സുരക്ഷ" },
  },
  { key: "clean_milk", label: { en: "clean milk", ml: "ശുദ്ധമായ പാൽ" } },
  { key: "cleft_lip", label: { en: "cleft lip", ml: "മുറിച്ചുണ്ട്" } },
  { key: "clubfoot", label: { en: "clubfoot", ml: "ക്ലബ്ബ്ഫൂട്ട്" } },
  {
    key: "community_cattle_shed",
    label: { en: "community cattle shed", ml: "കമ്മ്യൂണിറ്റി തൊഴുത്ത്" },
  },
  { key: "compensation", label: { en: "compensation", ml: "നഷ്ടപരിഹാരം" } },
  {
    key: "consumer_interface",
    label: { en: "consumer interface", ml: "ഉപഭോക്തൃ സംവാദം" },
  },
  {
    key: "contingency_fund",
    label: { en: "contingency fund", ml: "അടിയന്തര സഹായം" },
  },
  { key: "construction", label: { en: "construction", ml: "നിർമ്മാണം" } },
  {
    key: "co-operative_society",
    label: { en: "co-operative society", ml: "സഹകരണ സംഘം" },
  },
  { key: "cooperators", label: { en: "cooperators", ml: "സഹകാരികൾ" } },
  { key: "counseling", label: { en: "counseling", ml: "കൗൺസിലിംഗ്" } },
  { key: "cow_death", label: { en: "cow death", ml: "പശു മരണം" } },
  { key: "cow_dung_dryer", label: { en: "cow dung dryer", ml: "ചാണകം ഡ്രയർ" } },
  { key: "cow_dung_pit", label: { en: "cow dung pit", ml: "ചാണകക്കുഴി" } },
  { key: "cybercrime", label: { en: "cybercrime", ml: "സൈബർ ക്രൈം" } },
  { key: "dairy", label: { en: "dairy", ml: "ക്ഷീരം" } },
  { key: "dairy_club", label: { en: "dairy club", ml: "ഡയറി ക്ലബ്ബ്" } },
  {
    key: "dairy_co-operative_society",
    label: { en: "dairy co-operative society", ml: "ക്ഷീര സഹകരണ സംഘം" },
  },
  {
    key: "dairy_development",
    label: { en: "dairy development", ml: "ക്ഷീര വികസനം" },
  },
  {
    key: "dairy_extension",
    label: { en: "dairy extension", ml: "ക്ഷീര വിജ്ഞാന വ്യാപനം" },
  },
  { key: "dairy_farmers", label: { en: "dairy farmers", ml: "ക്ഷീരകർഷകർ" } },
  { key: "dairy_meet", label: { en: "dairy meet", ml: "ക്ഷീര സംഗമം" } },
  { key: "dairy_society", label: { en: "dairy society", ml: "ക്ഷീര സംഘം" } },
  { key: "dcs", label: { en: "dcs", ml: "ഡിസിഎസ്" } },
  { key: "deic", label: { en: "deic", ml: "ഡിഇഐസി" } },
  { key: "delivery", label: { en: "delivery", ml: "പ്രസവം" } },
  { key: "destitute", label: { en: "destitute", ml: "നിരാലംബർ" } },
  { key: "development", label: { en: "development", ml: "വികസനം" } },
  { key: "disabled", label: { en: "disabled", ml: "ഭിന്നശേഷി" } },
  { key: "discipline", label: { en: "discipline", ml: "അച്ചടക്കം" } },
  {
    key: "disease_prevention",
    label: { en: "disease prevention", ml: "രോഗപ്രതിരോധം" },
  },
  { key: "district_level", label: { en: "district level", ml: "ജില്ലാ തലം" } },
  {
    key: "doorstep_marketing",
    label: { en: "doorstep marketing", ml: "വീട്ടുപടിക്കൽ വിപണനം" },
  },
  {
    key: "early_intervention",
    label: { en: "early intervention", ml: "ഏർളി ഇന്റർവെൻഷൻ" },
  },
  { key: "education", label: { en: "education", ml: "വിദ്യാഭ്യാസം" } },
  {
    key: "effluent_treatment",
    label: { en: "effluent treatment", ml: "മാലിന്യ സംസ്കരണം" },
  },
  { key: "entrepreneur", label: { en: "entrepreneur", ml: "സംരംഭകൻ" } },
  { key: "ess", label: { en: "ess", ml: "ESS" } },
  { key: "etp", label: { en: "etp", ml: "ഇടിപി" } },
  { key: "farm_hygiene", label: { en: "farm hygiene", ml: "ഫാം ശുചിത്വം" } },
  { key: "farmers", label: { en: "farmers", ml: "കർഷകർ" } },
  {
    key: "farmers_contact",
    label: { en: "farmers contact", ml: "കർഷക സമ്പർക്കം" },
  },
  {
    key: "farmers_facilitation_centre",
    label: { en: "farmers facilitation centre", ml: "കർഷക സഹായ കേന്ദ്രം" },
  },
  { key: "feed", label: { en: "feed", ml: "കാലിത്തീറ്റ" } },
  {
    key: "feed_component",
    label: { en: "feed component", ml: "കാലിത്തീറ്റ ഘടകം" },
  },
  { key: "feed_cost", label: { en: "feed cost", ml: "തീറ്റച്ചെലവ്" } },
  {
    key: "feed_supplement",
    label: { en: "feed supplement", ml: "ഫീഡ് സപ്ലിമെന്റ്" },
  },
  { key: "fhc", label: { en: "fhc", ml: "കുടുംബാരോഗ്യ കേന്ദ്രം" } },
  { key: "fodder", label: { en: "fodder", ml: "തീറ്റപ്പുൽ" } },
  {
    key: "fodder_cultivation",
    label: { en: "fodder cultivation", ml: "തീറ്റപ്പുൽ കൃഷി" },
  },
  {
    key: "food_processing",
    label: { en: "food processing", ml: "ഭക്ഷ്യ സംസ്കരണം" },
  },
  {
    key: "forest_department",
    label: { en: "forest department", ml: "വനം വകുപ്പ്" },
  },
  { key: "free_delivery", label: { en: "free delivery", ml: "സൗജന്യ പ്രസവം" } },
  {
    key: "free_treatment",
    label: { en: "free treatment", ml: "സൗജന്യ ചികിത്സ" },
  },
  { key: "fssai", label: { en: "fssai", ml: "FSSAI" } },
  {
    key: "gender_violence",
    label: { en: "gender violence", ml: "ലിംഗപരമായ അതിക്രമം" },
  },
  { key: "grama_sabha", label: { en: "grama sabha", ml: "ഗ്രാമസഭ" } },
  { key: "group_loan", label: { en: "group loan", ml: "സംഘ വായ്പ" } },
  { key: "handicrafts", label: { en: "handicrafts", ml: "കരകൗശലം" } },
  { key: "heart_disease", label: { en: "heart disease", ml: "ഹൃദ്രോഗം" } },
  { key: "hectare", label: { en: "hectare", ml: "ഹെക്ടർ" } },
  { key: "heifer_park", label: { en: "heifer park", ml: "ഹെഫർ പാർക്ക്" } },
  { key: "helpline", label: { en: "helpline", ml: "ഹെൽപ്പ് ലൈൻ" } },
  { key: "hemophilia", label: { en: "hemophilia", ml: "ഹീമോഫീലിയ" } },
  {
    key: "herd_induction",
    label: { en: "herd induction", ml: "പുതിയ കന്നുകാലി" },
  },
  { key: "homeless", label: { en: "homeless", ml: "വീടില്ലാത്തവർ" } },
  { key: "housing", label: { en: "housing", ml: "ഭവനം" } },
  { key: "hridyam", label: { en: "hridyam", ml: "ഹൃദ്യം" } },
  { key: "hygienic", label: { en: "hygienic", ml: "ശുചിത്വം" } },
  { key: "incentive", label: { en: "incentive", ml: "പ്രോത്സാഹനം" } },
  {
    key: "infant_health",
    label: { en: "infant health", ml: "ശിശു ആരോഗ്യ്യം" },
  },
  { key: "insurance", label: { en: "insurance", ml: "ഇൻഷുറൻസ്" } },
  {
    key: "interest_subvention",
    label: { en: "interest subvention", ml: "പലിശയിളവ്" },
  },
  { key: "interest-free", label: { en: "interest-free", ml: "പലിശരഹിതം" } },
  { key: "investment", label: { en: "investment", ml: "നിക്ഷേപം" } },
  { key: "irrigation", label: { en: "irrigation", ml: "ജലസേചനം" } },
  {
    key: "jal_jeevan_mission",
    label: { en: "jal jeevan mission", ml: "ജൽ ജീവൻ മിഷൻ" },
  },
  { key: "jjm", label: { en: "jjm", ml: "ജെജെഎം" } },
  { key: "jlg", label: { en: "jlg", ml: "ജെഎൽജി" } },
  { key: "jsy", label: { en: "jsy", ml: "ജെഎസ്വൈ" } },
  { key: "jssk", label: { en: "jssk", ml: "ജെഎസ്എസ്കെ" } },
  { key: "kaivalya", label: { en: "kaivalya", ml: "കൈവല്യ" } },
  { key: "kesru", label: { en: "kesru", ml: "കെസ്റു" } },
  { key: "kiifb", label: { en: "kiifb", ml: "കിഫ്ബി" } },
  { key: "kolar_model", label: { en: "kolar model", ml: "കോലാർ മാതൃക" } },
  {
    key: "ksheera_gramam",
    label: { en: "ksheera gramam", ml: "ക്ഷീര ഗ്രാമം" },
  },
  { key: "ksheeralayam", label: { en: "ksheeralayam", ml: "ക്ഷീരാലയം" } },
  { key: "ksheerasree", label: { en: "ksheerasree", ml: "ക്ഷീരശ്രീ" } },
  {
    key: "ksheerasangamam",
    label: { en: "ksheerasangamam", ml: "ക്ഷീരസംഗമം" },
  },
  { key: "ksheerayuva", label: { en: "ksheerayuva", ml: "ക്ഷീരയുവ" } },
  { key: "kudumbasree", label: { en: "kudumbasree", ml: "കുടുംബശ്രീ" } },
  { key: "kwa", label: { en: "kwa", ml: "കെഡബ്ല്യുഎ" } },
  { key: "labs", label: { en: "labs", ml: "ലാബുകൾ" } },
  { key: "land_purchase", label: { en: "land purchase", ml: "ഭൂമി വാങ്ങൽ" } },
  { key: "landless", label: { en: "landless", ml: "ഭൂരഹിതർ" } },
  { key: "latrine", label: { en: "latrine", ml: "ശൗചാലയം" } },
  { key: "license", label: { en: "license", ml: "ലൈസൻസ്" } },
  { key: "life_mission", label: { en: "life mission", ml: "ലൈഫ് മിഷൻ" } },
  {
    key: "lifestyle_disease",
    label: { en: "lifestyle disease", ml: "ജീവിതശൈലീ രോഗം" },
  },
  { key: "livelihood", label: { en: "livelihood", ml: "ഉപജീവനം" } },
  { key: "loan", label: { en: "loan", ml: "വായ്പ" } },
  { key: "lsgi", label: { en: "lsgi", ml: "തദ്ദേശ സ്ഥാപനം" } },
  { key: "lss", label: { en: "lss", ml: "LSS" } },
  { key: "maize", label: { en: "maize", ml: "ചോളം" } },
  { key: "margin_money", label: { en: "margin money", ml: "മാർജിൻ മണി" } },
  { key: "marketing", label: { en: "marketing", ml: "വിപണനം" } },
  {
    key: "maternal_health",
    label: { en: "maternal health", ml: "മാതൃ ആരോഗ്യ്യം" },
  },
  { key: "mathruyaanam", label: { en: "mathruyaanam", ml: "മാതൃയാനം" } },
  {
    key: "mechanisation",
    label: { en: "mechanisation", ml: "യന്ത്രവൽക്കരണം" },
  },
  { key: "mental_health", label: { en: "mental health", ml: "മാനസികാരോഗ്യം" } },
  {
    key: "micro_enterprise",
    label: { en: "micro enterprise", ml: "മൈക്രോ സംരംഭം" },
  },
  {
    key: "milk_collection",
    label: { en: "milk collection", ml: "പാൽ ശേഖരണം" },
  },
  {
    key: "milk_incentive",
    label: { en: "milk incentive", ml: "പാൽ പ്രോത്സാഹനം" },
  },
  {
    key: "milk_procurement",
    label: { en: "milk procurement", ml: "പാൽ സംഭരണം" },
  },
  { key: "milk_route", label: { en: "milk route", ml: "പാൽ റൂട്ട്" } },
  { key: "milk_shed", label: { en: "milk shed", ml: "ക്ഷീര ഗ്രാമം" } },
  { key: "milk_testing", label: { en: "milk testing", ml: "പാൽ പരിശോധന" } },
  {
    key: "milking_machine",
    label: { en: "milking machine", ml: "പാൽ കറവ യന്ത്രം" },
  },
  {
    key: "mineral_mixture",
    label: { en: "mineral mixture", ml: "ധാതുലവണ മിശ്രിതം" },
  },
  {
    key: "mini_dairy_farm",
    label: { en: "mini dairy farm", ml: "മിനി ഡയറി ഫാം" },
  },
  { key: "mission_1000", label: { en: "mission 1000", ml: "മിഷൻ 1000" } },
  { key: "mmg", label: { en: "mmg", ml: "MMG" } },
  { key: "mobile_unit", label: { en: "mobile unit", ml: "മൊബൈൽ യൂണിറ്റ്" } },
  {
    key: "modernisation",
    label: { en: "modernisation", ml: "ആധുനികവൽക്കരണം" },
  },
  { key: "msme", label: { en: "msme", ml: "എംഎസ്എംഇ" } },
  { key: "multipurpose", label: { en: "multipurpose", ml: "മൾട്ടിപർപ്പസ്" } },
  { key: "nano_unit", label: { en: "nano unit", ml: "നാനോ യൂണിറ്റ്" } },
  { key: "navajeevan", label: { en: "navajeevan", ml: "നവജീവൻ" } },
  { key: "ncd", label: { en: "ncd", ml: "എൻസിഡി" } },
  {
    key: "need-based_assistance",
    label: { en: "need-based assistance", ml: "ആവശ്യാനുസരണ സഹായം" },
  },
  { key: "new_cattle", label: { en: "new cattle", ml: "കന്നുകാലി വാങ്ങൽ" } },
  { key: "new_dcs", label: { en: "new dcs", ml: "പുതിയ ഡിസിഎസ്" } },
  { key: "newborn", label: { en: "newborn", ml: "നവജാതശിശു" } },
  { key: "nirbhaya", label: { en: "nirbhaya", ml: "നിർഭയ" } },
  { key: "nri", label: { en: "nri", ml: "പ്രവാസി" } },
  { key: "nuhm", label: { en: "nuhm", ml: "എൻയുഎച്ച്എം" } },
  { key: "ofoe", label: { en: "ofoe", ml: "OFOE" } },
  {
    key: "one_family_one_enterprise",
    label: { en: "one family one enterprise", ml: "ഒരു കുടുംബം ഒരു സംരംഭം" },
  },
  { key: "online_safety", label: { en: "online safety", ml: "ഓൺലൈൻ സുരക്ഷ" } },
  { key: "paddy_loan", label: { en: "paddy loan", ml: "നെൽവായ്പ" } },
  {
    key: "plantation_workers",
    label: { en: "plantation workers", ml: "തോട്ടം തൊഴിലാളികൾ" },
  },
  {
    key: "plus_two_fail",
    label: { en: "plus two fail", ml: "പ്ലസ് ടു തോറ്റവർ" },
  },
  { key: "pmegp", label: { en: "pmegp", ml: "PMEGP" } },
  { key: "pmfme", label: { en: "pmfme", ml: "PMFME" } },
  {
    key: "pollution_control",
    label: { en: "pollution control", ml: "മലിനീകരണ നിയന്ത്രണം" },
  },
  {
    key: "poverty_eradication",
    label: { en: "poverty eradication", ml: "ദാരിദ്ര്യ നിർമ്മാർജ്ജനം" },
  },
  {
    key: "primary_health",
    label: { en: "primary health", ml: "പ്രാഥമിക ആരോഗ്യ്യം" },
  },
  { key: "quality", label: { en: "quality", ml: "ഗുണനിലവാരം" } },
  {
    key: "quality_awareness",
    label: { en: "quality awareness", ml: "ഗുണനിലവാര ബോധവൽക്കരണം" },
  },
  {
    key: "quality_control",
    label: { en: "quality control", ml: "ഗുണനിലവാര നിയന്ത്രണം" },
  },
  {
    key: "quality_control_assistance",
    label: {
      en: "quality control assistance",
      ml: "ഗുണനിലവാര നിയന്ത്രണ സഹായം",
    },
  },
  { key: "quarantine", label: { en: "quarantine", ml: "ക്വാറന്റൈൻ" } },
  { key: "rbsk", label: { en: "rbsk", ml: "ആർബിഎസ്കെ" } },
  { key: "registration", label: { en: "registration", ml: "രജിസ്ട്രേഷൻ" } },
  { key: "relief_fund", label: { en: "relief fund", ml: "ദുരിതാശ്വാസ നിധി" } },
  {
    key: "revolving_fund",
    label: { en: "revolving fund", ml: "റിവോൾവിംഗ് ഫണ്ട്" },
  },
  { key: "ridf", label: { en: "ridf", ml: "RIDF" } },
  {
    key: "rural_services",
    label: { en: "rural services", ml: "ഗ്രാമീണ സേവനങ്ങൾ" },
  },
  { key: "sanitation", label: { en: "sanitation", ml: "ശുചിത്വം" } },
  { key: "saranya", label: { en: "saranya", ml: "ശരണ്യ" } },
  { key: "sbm", label: { en: "sbm", ml: "എസ്ബിഎം" } },
  { key: "scale-up", label: { en: "scale-up", ml: "സ്കെയിൽ-അപ്പ്" } },
  { key: "school", label: { en: "school", ml: "സ്കൂൾ" } },
  { key: "screening", label: { en: "screening", ml: "സ്ക്രീനിംഗ്" } },
  { key: "seeds", label: { en: "seeds", ml: "വിത്തുകൾ" } },
  {
    key: "self-employment",
    label: { en: "self-employment", ml: "സ്വയംതൊഴിൽ" },
  },
  {
    key: "senior_citizen",
    label: { en: "senior citizen", ml: "മുതിർന്ന പൗരൻ" },
  },
  { key: "shalabham", label: { en: "shalabham", ml: "ശലഭം" } },
  { key: "shg", label: { en: "shg", ml: "എസ്എച്ച്ജി" } },
  { key: "slips", label: { en: "slips", ml: "നടീൽ വസ്തുക്കൾ" } },
  {
    key: "smart_dairy_farm",
    label: { en: "smart dairy farm", ml: "സ്മാർട്ട് ഡയറി ഫാം" },
  },
  {
    key: "soil_conservation",
    label: { en: "soil conservation", ml: "മണ്ണ് സംരക്ഷണം" },
  },
  { key: "solar_panel", label: { en: "solar panel", ml: "സോളാർ പാനൽ" } },
  { key: "spc", label: { en: "spc", ml: "എസ്പിസി" } },
  { key: "sslc_fail", label: { en: "sslc fail", ml: "എസ്എസ്എൽസി തോറ്റവർ" } },
  { key: "straw", label: { en: "straw", ml: "വൈക്കോൽ" } },
  {
    key: "student_police",
    label: { en: "student police", ml: "സ്റ്റുഡന്റ് പോലീസ്" },
  },
  {
    key: "student_support",
    label: { en: "student support", ml: "വിദ്യാർത്ഥി പിന്തുണ" },
  },
  { key: "students", label: { en: "students", ml: "വിദ്യാർത്ഥികൾ" } },
  { key: "subsidy", label: { en: "subsidy", ml: "സബ്സിഡി" } },
  { key: "surgery", label: { en: "surgery", ml: "ശസ്ത്രക്രിയ" } },
  { key: "swachh_bharat", label: { en: "swachh bharat", ml: "സ്വച്ഛ് ഭാരത്" } },
  {
    key: "tap_connection",
    label: { en: "tap connection", ml: "ടാപ്പ് കണക്ഷൻ" },
  },
  { key: "toilet", label: { en: "toilet", ml: "ടോയ്ലറ്റ്" } },
  { key: "transport", label: { en: "transport", ml: "ഗതാഗതം" } },
  { key: "transportation", label: { en: "transportation", ml: "ഗതാഗതം" } },
  { key: "udyam", label: { en: "udyam", ml: "ഉദ്യം" } },
  { key: "urban_health", label: { en: "urban health", ml: "നഗരാരോഗ്യം" } },
  { key: "urine_pit", label: { en: "urine pit", ml: "മൂത്രക്കുഴി" } },
  {
    key: "veterinary_medicines",
    label: { en: "veterinary medicines", ml: "മൃഗചികിത്സാ മരുന്ന്" },
  },
  {
    key: "waste_management",
    label: { en: "waste management", ml: "മാലിന്യ സംസ്കരണം" },
  },
  { key: "water_supply", label: { en: "water supply", ml: "കുടിവെള്ളം" } },
  { key: "widow", label: { en: "widow", ml: "വിധവ" } },
  {
    key: "wildlife_attack",
    label: { en: "wildlife attack", ml: "വന്യജീവി ആക്രമണം" },
  },
  { key: "women", label: { en: "women", ml: "വനിതകൾ" } },
  { key: "women_safety", label: { en: "women safety", ml: "വനിതാ സുരക്ഷ" } },
  { key: "women_support", label: { en: "women support", ml: "വനിതാ പിന്തുണ" } },
  {
    key: "world_milk_day",
    label: { en: "world milk day", ml: "ലോക ക്ഷീര ദിനം" },
  },
  { key: "youth", label: { en: "youth", ml: "യുവജനങ്ങൾ" } },
];

export default function Autocomplete() {
  const { currentLang, handleSidebarFilterChange, sidebarFilters } =
    useDashboardContext();

  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const selectedKeys = useMemo(
    () => new Set(sidebarFilters.keywords.map((k) => k.key)),
    [sidebarFilters.keywords]
  );
  // This is now clean. Its only job is to compute the selectedItems array.
  const selectedItems = useMemo(() => {
    return keywords.filter((item) => selectedKeys.has(item.key));
  }, [selectedKeys]);

  useEffect(() => {
    // We create a *new* object for the filters to ensure immutability.
    handleSidebarFilterChange((prev) => ({
      ...prev,
      keywords: selectedItems,
    }));
    // Optionally, log the new value:
    
  }, [selectedKeys, handleSidebarFilterChange, selectedItems]);

  const filteredItems = useMemo(() => {
    if (!inputValue) return keywords;
    const lowerCaseInput = inputValue.toLowerCase();
    return keywords.filter((item) => {
      const matchesEnglish = item.label.en
        .toLowerCase()
        .includes(lowerCaseInput);
      const matchesMalayalam = item.label.ml
        .toLowerCase()
        .includes(lowerCaseInput);
      return matchesEnglish || matchesMalayalam;
    });
  }, [inputValue]);

  const handleSelectionChange = (key) => {
    if (key && !selectedKeys.has(key)) {
      const selectedKeyword = keywords.find((k) => k.key === key);
      if (selectedKeyword) {
        const newKeywords = [...sidebarFilters.keywords, selectedKeyword];
        handleSidebarFilterChange({ keywords: newKeywords });
      }
      setInputValue("");
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  const removeSelectedItem = (key) => {
    const newKeywords = sidebarFilters.keywords.filter((k) => k.key !== key);
    handleSidebarFilterChange({ keywords: newKeywords });
  };

  const clearAll = () => {
    handleSidebarFilterChange({ keywords: [] });
    setInputValue("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        setFocusedIndex(0);
        e.preventDefault();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredItems.length) {
          handleSelectionChange(filteredItems[focusedIndex].key);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="mx-auto space-y-6 h-fit">
      {/* 3. Removed language switcher buttons */}

      {/* Selected Items Card */}
      {selectedItems.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              Selections
              <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                {selectedItems.length}
              </span>
            </h3>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-2 py-1 text-xs text-destructive hover:text-destructive/80 hover:bg-destructive/5 rounded-md transition-all duration-200 font-medium"
            >
              <X size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item, index) => (
              <div
                key={item.key}
                className="group inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-2.5 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 animate-[fadeInUp_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 4. Displaying label based on currentLang from context */}
                <span>{item.label[currentLang]}</span>
                <button
                  onClick={() => removeSelectedItem(item.key)}
                  className="hover:bg-primary-foreground/20 rounded-full p-0.5 transition-colors duration-200"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Autocomplete Input */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for schemes or keywords..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
              setFocusedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-10 py-3 bg-background border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all duration-200 text-foreground placeholder:text-muted-foreground"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <ChevronDown
              size={18}
              className={`text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-72 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            <div className="overflow-y-auto max-h-72 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {filteredItems.length > 0 ? (
                <div className="py-1">
                  {filteredItems.map((item, index) => {
                    const isSelected = selectedKeys.has(item.key);
                    const isFocused = index === focusedIndex;
                    return (
                      <div
                        key={item.key}
                        className={`px-3 py-2 cursor-pointer transition-all duration-200 ${
                          isFocused
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/50"
                        } ${isSelected ? "bg-accent/30" : ""}`}
                        onClick={() => handleSelectionChange(item.key)}
                        onMouseEnter={() => setFocusedIndex(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-medium ${
                                  isSelected
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {/* 4. Displaying label based on currentLang from context */}
                                {item.label[currentLang]}
                              </span>
                              {isSelected && (
                                <div className="flex items-center gap-1 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs font-medium">
                                  <Check size={10} />
                                  <span>Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-3 py-6 text-center">
                  <Search
                    size={24}
                    className="mx-auto mb-2 text-muted-foreground/50"
                  />
                  <p className="text-muted-foreground text-sm">
                    {inputValue
                      ? `No keywords found matching "${inputValue}"`
                      : "Start typing to search..."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thumb-muted::-webkit-scrollbar-thumb {
          background-color: hsl(var(--muted));
          border-radius: 2px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
