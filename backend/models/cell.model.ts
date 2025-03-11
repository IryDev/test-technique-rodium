import mongoose, {Schema} from "mongoose";

const CellSchema = new Schema({
  col: { type: String, required: true },
  row: { type: Number, required: true },
  value: { type: String, required: true },
});

const Cell = mongoose.model("Cell", CellSchema);

export { Cell };