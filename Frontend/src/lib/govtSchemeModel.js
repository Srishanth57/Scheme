import mongoose from "mongoose";
import GovernmentSchemeSchema from "models/Government";

export function getSchemeModel(collectionName) {
  // Prevent model overwrite error
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, GovernmentSchemeSchema, collectionName)
  );
}