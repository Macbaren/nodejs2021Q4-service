const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');

let tasks = require('./tasks.repository');

// helpers functions
const findBoardTasks = (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

const findTask = (boardId, id) =>
  tasks.find((task) => task.boardId === boardId && task.id === id);

// GET boards/:boardId/tasks - get all tasks
const getAllTasks = (request, reply) => {
  const { boardId } = request.params;

  if (!isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const board = findBoardTasks(boardId);

  if (board === undefined) {
    reply.code(404).send({ message: `board with id: ${board} did not found` });
  }

  reply.send(board);
};

// GET boards/:boardId/tasks/:taskId - get the task by id
const getTask = (request, reply) => {
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
const addTask = (request, reply) => {
  const { boardId } = request.params;
  const {
    title,
    order,
    description,
    userId,
    columnId,
  } = request.body;

  const task = {
    id: uuidv4(),
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
const updateTask = (request, reply) => {
  const { id, boardId } = request.params;

  if (!isUuid(id) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const task = findTask(boardId, id);

  if (task === undefined) {
    reply.code(404).send({ message: `task with id: ${id} did not found` });
  }

  const {
    title = task.title,
    order = task.order,
    description = task.description,
    userId = task.userId,
    columnId = task.columnId,
  } = request.body;

  tasks = tasks.map((it) =>
    it.id === id
      ? { id, title, order, description, userId, boardId, columnId }
      : it
  );

  reply.send(task);
};

// DELETE boards/:boardId/tasks/:taskId - delete task
const deleteTask = (request, reply) => {
  const { taskId, boardId } = request.params;

  if (!isUuid(taskId) || !isUuid(boardId)) {
    reply.code(400).send({ message: 'taskId is not uuid format' });
  }

  const task = findTask(boardId, taskId);

  if (task === undefined) {
    reply.code(404).send({ message: `task with taskId: ${taskId} did not found` });
  }

  tasks = tasks.filter((t) => t.id !== taskId);

  reply.send({ message: `task ${taskId} deleted successfully` });
};


module.exports = {
  getAllTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
