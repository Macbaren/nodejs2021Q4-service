"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRoutes = void 0;
const tasks_model_1 = require("./tasks.model");
function tasksRoutes(fastify, _, done) {
    // get all tasks
    fastify.get('/boards/:boardId/tasks', tasks_model_1.getAllTasksOps);
    // get required task
    fastify.get('/boards/:boardId/tasks/:taskId', tasks_model_1.getTaskOps);
    // add task
    fastify.post('/boards/:boardId/tasks', tasks_model_1.postTaskOps);
    // update task
    fastify.put('/boards/:boardId/tasks/:taskId', tasks_model_1.updateTaskOps);
    // delete task
    fastify.delete('/boards/:boardId/tasks/:taskId', tasks_model_1.deleteTaskOps);
    done();
}
exports.tasksRoutes = tasksRoutes;
