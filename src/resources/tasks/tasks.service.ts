import { FastifyReply, FastifyRequest } from "fastify";

const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');

let tasks = require('./tasks.repository');

interface taskParams {
  taskId: string;
  boardId: string;
}

export interface TaskBody {
  taskId: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
}

type taskRequest = FastifyRequest<{
  Params: taskParams,
  Body: TaskBody,
}>

// helpers functions
const findBoardTasks = (boardId: string) =>
  tasks.filter((task: TaskBody) => task.boardId === boardId);

const findTask = (boardId: string, taskId: string) =>
  tasks.find((task: TaskBody) => task.boardId === boardId && task.taskId === taskId);

// GET boards/:boardId/tasks - get all tasks
export const getAllTasks = (request: taskRequest, reply: FastifyReply) => {
  const { boardId } = request.params;

  if (!isUuid(boardId)) {
    reply.code(400).send({ message: 'taskId is not uuid format' });
  }

  const board = findBoardTasks(boardId);

  if (board === undefined) {
    reply.code(404).send({ message: `board with taskId: ${board} did not found` });
  }

  reply.send(board);
};

// GET boards/:boardId/tasks/:taskId - get the task by taskId
export const getTask = (request: taskRequest, reply: FastifyReply) => {
  const { taskId, boardId } = request.params;

  if (!isUuid(taskId) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'taskId is not uuid format' });
  }

  const task = findTask(boardId, taskId);

  if (task === undefined) {
    reply.code(404).send({ message: `task with taskId: ${taskId} did not found` });
  }

  reply.send(task);
};

// POST boards/:boardId/tasks - create task
export const addTask = (request: taskRequest, reply: FastifyReply) => {
  const { boardId } = request.params;
  const {
    title,
    order,
    description,
    userId = uuidv4(),
    columnId = uuidv4(),
  } = request.body;

  const task = {
    taskId: uuidv4(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  };

  tasks = [...tasks, task];

  reply.code(201).send(task);
};

// PUT boards/:boardId/tasks/:taskId - update task
export const updateTask = (request: taskRequest, reply: FastifyReply) => {
  const { taskId, boardId } = request.params;

  if (!isUuid(taskId) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'taskId is not uuid format' });
  }

  const task = findTask(boardId, taskId);

  if (task === undefined) {
    reply.code(404).send({ message: `task with taskId: ${taskId} did not found` });
  }

  const {
    title = task.title,
    order = task.order,
    description = task.description,
    userId = task.userId,
    columnId = task.columnId,
  } = request.body;

  tasks = tasks.map((it: TaskBody) =>
    it.taskId === taskId
      ? { taskId, title, order, description, userId, boardId, columnId }
      : it
  );

  reply.send(task);
};

// DELETE boards/:boardId/tasks/:taskId - delete task
export const deleteTask = (request: taskRequest, reply: FastifyReply) => {
  const { taskId, boardId } = request.params;

  if (!isUuid(taskId) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'taskId is not uuid format' });
  }

  const task = findTask(boardId, taskId);

  if (task === undefined) {
    reply.code(404).send({ message: `task with taskId: ${taskId} did not found` });
  }

  tasks = tasks.filter((t: TaskBody) => t.taskId !== taskId);

  reply.send({ message: `task ${taskId} deleted successfully` });
};


// module.exports = {
//   getAllTasks,
//   getTask,
//   addTask,
//   deleteTask,
//   updateTask,
// };
