import mongoose from "mongoose";
import { DB_URI, BUN_ENV } from "../config/env";

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI!);

    console.log(`Database connected in ${BUN_ENV} mode`);
  } catch (error: any) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};
