import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getAllTasksOps,
  getTaskOps,
  // postTaskOps,
  // deleteTaskOps,
  // updateTaskOps,
} from './tasks.model';

export function tasksRoutes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  // get all tasks
  fastify.get('/boards/:boardId/tasks', getAllTasksOps);
  // get required task
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOps);
  // // add task
  // fastify.post('/boards/:boardId/tasks', postTaskOps);
  // // delete task
  // fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOps);
  // // update task
  // fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOps);

  done();
}
