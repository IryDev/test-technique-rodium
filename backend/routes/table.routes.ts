import express from "express";
import {
  getAllCells,
  resetTable,
  updateCell,
} from "../controllers/table.controllers";

const tableRouter = express.Router();

tableRouter.get("/", getAllCells);

tableRouter.post("/cells/:id", updateCell);

tableRouter.post("/reset", resetTable);

export default tableRouter;
