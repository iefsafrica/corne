const { getAllTasks, createTask, getTaskById, updateTasks, deleteTask } = require("./tasks.controller");
const express = require("express");
const router = express.Router()

router.get('/:id', getTaskById);
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTasks);
router.delete('/id', deleteTask);

module.exports = router;

