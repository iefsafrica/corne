const {taskManager} = require('../../../helpers/validations/createTask');
const taskService = require('../service/taskService');

const taskController = () => {
    return {
        createTask: async (req, res) => {
            try{
                const {error} = taskManager.validateCreateTask().validate(req.body, {abortEarly: false});
                if (error) {
                    return res.status(400).json({message: 'Validation Error', error: error.details[0].message});
                }

                const result =  await req.taskService.createTask(req.body);

                return res.status(result.status).json({
                    message: result.message,
                });
                
            }catch (error) {
                res.status(500).json({message: 'Internal Server Error', error: error.message});
            }
        },

        deleteTask: async (req, res) => {
            try{
                const {error} = taskManager.validateDeleteTask().validate(req.body, {abortEarly: false});
                if (error) {
                    return res.status(400).json({message: 'Validation Error', error: error.details[0].message});
                }

                const result =  await req.taskService.deleteTask(req.body);

                return res.status(result.status).json({
                    message: result.message,
                });
                
            }catch (error) {
                res.status(500).json({message: 'Internal Server Error', error: error.message});
            }
        },

        updateTask: async (req, res) => {
            try{
                const {error} = taskManager.validateUpdateTask().validate(req.body, {abortEarly: false});
                if (error) {
                    return res.status(400).json({message: 'Validation Error', error: error.details[0].message});
                }

                const result =  await req.taskService.updateTask(req.body);

                return res.status(result.status).json({
                    message: result.message,
                });
                
            }catch (error) {
                res.status(500).json({message: 'Internal Server Error', error: error.message});
            }
        },

        getAllTask: async (req, res) => {
            try{
                const result =  await req.taskService.getAllTask(req.body);

                return res.status(result.status).json({
                    message: result.message,
                });
                
            }catch (error) {
                res.status(500).json({message: 'Internal Server Error', error: error.message});
            }
        },
        
    }
};

module.exports = taskController