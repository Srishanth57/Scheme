// lib/mongoose.js
"use server";
import mongoose from "mongoose";

// Cache connection for better performance in Next.js development (hot-reloading)
// and production (serverless functions)
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
const uri = process.env.MONGODB_URI;

async function connectDB() {
  if (global.mongoose.conn) {
    console.log("Using existing Mongoose connection");
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose's buffering of commands
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if unable to connect
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      dbName: "Schemes", // IMPORTANT: Specify your actual database name here
    };

    global.mongoose.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        global.mongoose.conn = mongooseInstance.connection;
        console.log("New Mongoose connection established");
        return mongooseInstance.connection;
      })
      .catch((error) => {
        console.error("Mongoose connection error:", error);
        global.mongoose.promise = null; // Reset promise on error
        throw error;
      });
  }

  return global.mongoose.promise;
}

export default connectDB;
