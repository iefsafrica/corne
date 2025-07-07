const { get } = require('http');
const joi  = require('joi');

const taskManager = {
    validateCreateTask: () => {
        return joi.object({
            title: joi.string().min(3).max(100).required(),
            description: joi.string().min(10).max(500).optional(),
            dueDate: joi.date().greater('now').optional(),
            priority: joi.string().valid('low', 'medium', 'high').optional(),
            assignedTo: joi.string().email().optional()
        });
    },

    validateUpdateTask: () => {
        return joi.object({
            title: joi.string().min(3).max(100).optional(),
            description: joi.string().min(10).max(500).optional(),
            dueDate: joi.date().greater('now').optional(),
            priority: joi.string().valid('low', 'medium', 'high').optional(),
            assignedTo: joi.string().email().optional()
        });
    },

    validateDeleteTask: () => {
        return joi.object({
            taskId: joi.string().required()
        });
    },

    getTaskById: () => {
        return joi.object({
            taskId: joi.string().required()
        });
    }

    
}

module.export = {taskManager}