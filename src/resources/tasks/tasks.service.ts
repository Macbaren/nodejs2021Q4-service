import { FastifyRequest, FastifyReply } from 'fastify';
import isUuid from 'uuid-validate';

import {
  ITaskReqBody,
  ITaskReqParam,
  ITaskResBody,
} from '../../common/interfaces';
import { tasksDbFunctions } from './tasks.repository';
import { Task } from './tasks.model';

// GET boards/:boardId/tasks - get all tasks
export const getAllTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { boardId } = request.params as ITaskReqParam;

  if (!isUuid(boardId)) {
    reply.code(400).send({ message: 'boardId is not uuid format' });
  }

  const boardTasks = await tasksDbFunctions.getAllTasks(boardId);

  if (boardTasks === null) {
    reply
      .code(404)
      .send({ message: `board with id: ${boardId} did not found` });
  } else reply.send(boardTasks);
};

// GET boards/:boardId/tasks/:taskId - get the task by id
export const getTask = (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId, taskId } = request.params as ITaskReqParam;

  if (!isUuid(taskId) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const task = tasksDbFunctions.getTask(boardId, taskId);

  if (task === undefined) {
    reply.code(404).send({ message: `task with id: ${taskId} did not found` });
  }

  reply.send(task);
};

// // POST boards/:boardId/tasks - create task
// const addTask = (request, reply) => {
//   const { boardId } = request.params;
//   const {
//     title,
//     order,
//     description,
//     userId = uuidv4(),
//     columnId = uuidv4(),
//   } = request.body;

//   const task = {
//     id: uuidv4(),
//     title,
//     order,
//     description,
//     userId,
//     boardId,
//     columnId,
//   };

//   tasks = [...tasks, task];

//   reply.code(201).send(task);
// };

// // DELETE boards/:boardId/tasks/:taskId - delete task
// const deleteTask = (request, reply) => {
//   const { id, boardId } = request.params;

//   if (!isUuid(id) || !isUuid(boardId)) {
//     reply.code(400).send({ message: 'id is not uuid format' });
//   }

//   const task = findTask(boardId, id);

//   if (task === undefined) {
//     reply.code(404).send({ message: `task with id: ${id} did not found` });
//   }

//   tasks = tasks.filter((t) => t.id !== id);

//   reply.send({ message: `task ${id} deleted successfully` });
// };

// // PUT boards/:boardId/tasks/:taskId - update task
// const updateTask = (request, reply) => {
//   const { id, boardId } = request.params;

//   if (!isUuid(id) || !isUuid(boardId)) {
//     reply.code(400).send({ message: 'id is not uuid format' });
//   }

//   const task = findTask(boardId, id);

//   if (task === undefined) {
//     reply.code(404).send({ message: `task with id: ${id} did not found` });
//   }

//   const {
//     title = task.title,
//     order = task.order,
//     description = task.description,
//     userId = task.userId,
//     columnId = task.columnId,
//   } = request.body;

//   tasks = tasks.map((it) =>
//     it.id === id
//       ? { id, title, order, description, userId, boardId, columnId }
//       : it
//   );

//   reply.send(task);
// };

// module.exports = {
//   getAllTasks,
//   getTask,
//   addTask,
//   deleteTask,
//   updateTask,
// };
