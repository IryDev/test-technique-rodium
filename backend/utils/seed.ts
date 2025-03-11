import mongoose from "mongoose";
import { DB_URI } from "../config/env";
import { Cell } from "../models/cell.model";
import type { CellType } from "../types";

const cells: CellType[] = [];

const letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cell: CellType = {
      col: letters[i],
      row: j + 1,
      value: "Cell " + ` ${letters[i]}${j + 1}`.toUpperCase(),
    };
    cells.push(cell);
  }
}

mongoose
  .connect(DB_URI!)
  .then(async () => {
    console.log("Connected to MongoDB");

    await Cell.deleteMany({});

    await Cell.insertMany(cells);
    console.log("Database seeded successfully");

    await mongoose.connection.close();
    console.log("Database connection closed");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
