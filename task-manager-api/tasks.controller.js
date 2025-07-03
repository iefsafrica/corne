let tasks = []
let currentId = 1;


const createTask= (req, res) => {
  const { title, description } = req.body;
  const newtask = {
    id: currentId++,
    title,
    description,
    createdAt: new Date.now()
  };
  tasks.push(newtask);
  res.status(201).json({meassage: 'New task created successfully', tasks})

};

const getAllTasks = (req, res) => {
  res.status(200).json(tasks)
}

const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({error: "Task not found"})

  res.status(200).json(task)
}

const updateTasks = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" })

  const { title, description } = req.body;


    if(title !== undefined) task.title = title
  if (description !== undefined) task.description = description

  res.status(201).json({meassage: 'Task updated successfully', tasks})
}

//Unable to complete my time is up
// const deleteTask = (req, res) => {
//   const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

//   if(index === -1 )
// }

module.exports = {
  createTask, getAllTasks, getTaskById, updateTasks
}