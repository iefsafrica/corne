import cors from "cors";
import express from "express";
import authRoutes from "../src/routes/authRoutes";
import taskRoutes from "../src/routes/taskRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
