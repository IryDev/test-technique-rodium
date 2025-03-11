import { config } from "dotenv";

config({ path: `.env.${process.env.BUN_END || "development"}.local` });

export const { PORT, BUN_ENV, DB_URI } = process.env;