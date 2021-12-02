const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');

let tasks = require('./database');

const findTask = (id) => tasks.find((u) => u.id === id);

// GET boards/:boardId/tasks - get all tasks
const getAllTasks = (request, reply) => {
  reply.send(tasks);
};

// GET boards/:boardId/tasks/:taskId - get the task by id
const getTask = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const task = findTask(id);

  if (task === undefined) {
    reply.code(404).send({ message: `task with id: ${id} did not found` });
  }

  reply.send(task);
};

// POST boards/:boardId/tasks - create task
const addTask = (request, reply) => {
  const { boardId } = request.params;
  const { title, order, description, userId, columnId } = request.body;

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

// DELETE boards/:boardId/tasks/:taskId - delete task
const deleteTask = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const task = findTask(id);

  if (task === undefined) {
    reply.code(404).send({ message: `task with id: ${id} did not found` });
  }

  tasks = tasks.filter((u) => u.id !== id);

  reply.send({ message: `task ${id} deleted successfully` });
};

// PUT boards/:boardId/tasks/:taskId - update task
const updateTask = (request, reply) => {
  const { id, boardId } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const task = findTask(id);

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

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
