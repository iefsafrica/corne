const express = require("express");
const tasksRouter = require("./tasks.router")

const app = express()
app.use(express.json());

app.use('/api/tasks', tasksRouter)


const PORT = 3000;
app.listen(PORT, () => {
  console.log("app is running on port 3000")
})