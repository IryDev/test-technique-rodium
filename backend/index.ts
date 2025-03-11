import express from "express";
import { PORT } from "./config/env";
import { connectDB } from "./database/mongodb";
import tableRouter from "./routes/table.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/v1/table", tableRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});
