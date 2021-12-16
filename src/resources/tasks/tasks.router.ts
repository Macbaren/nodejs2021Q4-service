import { FastifyInstance } from "fastify";

const {
  getAllTasksOps,
  getTaskOps,
  postTaskOps,
  deleteTaskOps,
  updateTaskOps,
} = require('./tasks.model');

export function tasksRoutes(fastify: FastifyInstance, done: Function) {
  // get all tasks
  fastify.get('/boards/:boardId/tasks', getAllTasksOps);
  // get required task
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOps);
  // add task
  fastify.post('/boards/:boardId/tasks', postTaskOps);
  // update task
  fastify.put('/boards/:boardId/tasks/:id', updateTaskOps);
  // delete task
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOps);
  done();
}
