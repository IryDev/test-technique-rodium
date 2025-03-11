import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Cell } from "../models/cell.model";

export async function getAllCells(req: Request, res: Response) {
  try {
    const cells = await Cell.find();
    res.status(200).json(cells);
  } catch (error) {
    console.error("Error fetching cells:", error);
    res.status(500).json({ message: "Error fetching cells from database" });
  }
}

export async function updateCell(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const { value } = req.body;
    const cell = await Cell.findByIdAndUpdate(
      id,
      { value },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    res.status(200).json(cell);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating cell:", error);
    res.status(500).json({ message: "Error updating cell in database" });
  }
}

export async function resetTable(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Cell.updateMany(
      {},
      {
        $set: {
          value: "Cell",
        },
      }
    );

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Table reset" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error resetting table:", error);
    res.status(500).json({ message: "Error resetting table in database" });
  }
}
