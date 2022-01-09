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
export const getTask = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId, taskId } = request.params as ITaskReqParam;

  if (!isUuid(taskId) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const task = await tasksDbFunctions.getTask(boardId, taskId);

  if (task === null) {
    reply.code(404).send({ message: `task with id: ${taskId} did not found` });
  } else reply.send(task);
};

// POST boards/:boardId/tasks - create task
export const addTask = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as ITaskReqParam;
  const newTask: ITaskResBody = new Task(request.body as ITaskReqBody);

  const task = await tasksDbFunctions.addTask(boardId, newTask);
  if (task === null) {
    reply.code(404).send('Board not found');
  } else {
    reply.code(201).send(task);
  }
};

// PUT boards/:boardId/tasks/:taskId - update task
export const updateTask = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { taskId, boardId } = request.params as ITaskReqParam;
  const newTask = new Task(request.body as ITaskReqBody);

  if (!isUuid(taskId) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const task = await tasksDbFunctions.updateTask(taskId, boardId, newTask);

  if (task === null) {
    reply.code(404).send({ message: `task with id: ${taskId} did not found` });
  } else reply.send(task);
};

// DELETE boards/:boardId/tasks/:taskId - delete task
export const deleteTask = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { taskId, boardId } = request.params as ITaskReqParam;
  // const newTask = new Task(request.body as ITaskReqBody);

  if (!isUuid(taskId) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const task = await tasksDbFunctions.deleteTask(taskId, boardId);

  if (task === null) {
    reply.code(404).send({ message: `task with id: ${taskId} did not found` });
  } else reply.code(204).send(task);
};
