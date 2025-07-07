import express from "express";
import {
  claimTask, deleteTask, getAllTasks, getTaskById, listAvailableTasks, myTasks, postTask, unclaimTask, updateTask
} from "../controllers/taskController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", postTask); //This will be  Public for now
router.put("/tasks/:id", updateTask)
router.get("/", listAvailableTasks);
router.delete("/tasks/:id", deleteTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);

router.post("/:id/claim", authenticateToken, claimTask);
router.get("/my", authenticateToken, myTasks);
router.post("/:id/unclaim", authenticateToken, unclaimTask);

export default router;