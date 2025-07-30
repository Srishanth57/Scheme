import GovernmentSchemeSchema from "../modals/Government.js";
import mongoose from "mongoose";

export function getSchemeModel(collectionName) {
  // Prevent model overwrite error
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, GovernmentSchemeSchema, collectionName)
  );
}
