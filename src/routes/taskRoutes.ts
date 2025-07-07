import express from "express";
import {
  claimTask, listAvailableTasks, myTasks, postTask, unclaimTask
} from "../controllers/taskController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", postTask); //This will be  Public for now
router.get("/", listAvailableTasks);

router.post("/:id/claim", authenticateToken, claimTask);
router.get("/my", authenticateToken, myTasks);
router.post("/:id/unclaim", authenticateToken, unclaimTask);

export default router;