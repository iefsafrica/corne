const { get } = require("http");


const { get } = require("http");

const taskService = (getTaskModel) => {
    const getTaskManeger = getTaskModel;

    const createTask = async (userData) => {
        try {
            const Task = getTaskManeger();

            const existingTask = await Task.findOne({
                $or: [{ title: userData.title }, { description: userData.description }]
            });

            if (existingTask) {
                return { status: 400, message: 'Task already exists' };
            }

            const newTask = new Task({
                ...userData,
            });

            await newTask.save();

            const userResponse = newTask.toObject();

            return { status: 201, message: 'Task created successfully', data: userResponse };

        } catch (error) {
            return { status: 500, message: 'Internal Server Error', error: error.message };
        }
    };

    const deleteTask = async (taskData) => {
        try {
            const Task = getTaskManeger();

            const task = await Task.findByIdAndDelete(taskData.taskId);

            if (!task) {
                return { status: 404, message: 'Task not found' };
            }

            return { status: 200, message: 'Task deleted successfully' };

        } catch (error) {
            return { status: 500, message: 'Internal Server Error', error: error.message };
        }
    };

    const updateTask = async (taskData) => {
        try {
            const Task = getTaskManeger();

            const updatedTask = await Task.findByIdAndUpdate(
                taskData.taskId,
                {
                    $set: {
                        title: taskData.title,
                        description: taskData.description,
                        dueDate: taskData.dueDate,
                        priority: taskData.priority,
                        assignedTo: taskData.assignedTo
                    }
                },
                { new: true }
            );
            if (!updatedTask) {
                return { status: 404, message: 'Task not found' };
            }
            return { status: 200, message: 'Task updated successfully', data: updatedTask };
        } catch (error) {
             return { status: 500, message: 'Internal Server Error', error: error.message };
        }
    };

    const getAllTask = async () => {
        try {
            const Task = getTaskManeger();

            const tasks = await Task.find({});

            if (!tasks || tasks.length === 0) {
                return { status: 404, message: 'No tasks found' };
            }

            return { status: 200, message: 'Tasks retrieved successfully', data: tasks };

        } catch (error) {
            return { status: 500, message: 'Internal Server Error', error: error.message };
        }
    };  

};

module.exports = taskService