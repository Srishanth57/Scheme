// src/lib/schemeSearch.js
import connectDB from "./db";
import AgricultureSchemes from "modals/Agriculture";
import CasteSchemes from "modals/Caste";
import ChildrenSchemes from "modals/Children";

export async function fetchRelevantSchemes(query, lang = "en") {
  await connectDB();

  // Simple keyword-based regex search across multiple collections
  // (In production, replace with MongoDB Atlas Vector Search)
  const regex = new RegExp(
    query
      .split(" ")
      .filter((w) => w.length > 2)
      .join("|"),
    "i",
  );

  const [agri, caste, children] = await Promise.all([
    AgricultureSchemes.find({
      $or: [
        { [`name.${lang}`]: regex },
        { [`description.${lang}`]: regex },
        { [`keywords.${lang}`]: regex },
      ],
    })
      .limit(3)
      .lean(),
    CasteSchemes.find({
      $or: [
        { [`name.${lang}`]: regex },
        { [`description.${lang}`]: regex },
        { [`keywords.${lang}`]: regex },
      ],
    })
      .limit(3)
      .lean(),
    ChildrenSchemes.find({
      $or: [
        { [`name.${lang}`]: regex },
        { [`description.${lang}`]: regex },
        { [`keywords.${lang}`]: regex },
      ],
    })
      .limit(3)
      .lean(),
  ]);

  return [...agri, ...caste, ...children];
}
