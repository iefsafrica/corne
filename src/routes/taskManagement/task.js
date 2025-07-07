const express =  require('express');
const router = express.Router();
const taskController = require('../../features/task/ctrl/taskCtrl');


const taskControllerInstance = taskController();

module.exports = routerTask = () => {
    router.post('/creatTask', taskControllerInstance.createTask);
    router.post('/deleteTask', taskControllerInstance.deleteTask);
    router.post('/user/:id', taskControllerInstance.updateTask);
    router.get('/get task', taskControllerInstance.getAllTask);
       
    return router;
}