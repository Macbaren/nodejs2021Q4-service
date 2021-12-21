"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTask = exports.getAllTasks = void 0;
const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');
let tasks = require('./tasks.repository');
// helpers functions
const findBoardTasks = (boardId) => tasks.filter((task) => task.boardId === boardId);
const findTask = (boardId, taskId) => tasks.find((task) => task.boardId === boardId && task.taskId === taskId);
// GET boards/:boardId/tasks - get all tasks
const getAllTasks = (request, reply) => {
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
exports.getAllTasks = getAllTasks;
// GET boards/:boardId/tasks/:taskId - get the task by taskId
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
exports.getTask = getTask;
// POST boards/:boardId/tasks - create task
const addTask = (request, reply) => {
    const { boardId } = request.params;
    const { title, order, description, userId = uuidv4(), columnId = uuidv4(), } = request.body;
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
exports.addTask = addTask;
// PUT boards/:boardId/tasks/:taskId - update task
const updateTask = (request, reply) => {
    const { taskId, boardId } = request.params;
    if (!isUuid(taskId) || !isUuid(boardId)) {
        reply.code(400).send({ message: 'taskId is not uuid format' });
    }
    const task = findTask(boardId, taskId);
    if (task === undefined) {
        reply.code(404).send({ message: `task with taskId: ${taskId} did not found` });
    }
    const { title = task.title, order = task.order, description = task.description, userId = task.userId, columnId = task.columnId, } = request.body;
    tasks = tasks.map((it) => it.taskId === taskId
        ? { taskId, title, order, description, userId, boardId, columnId }
        : it);
    reply.send(task);
};
exports.updateTask = updateTask;
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
    tasks = tasks.filter((t) => t.taskId !== taskId);
    reply.send({ message: `task ${taskId} deleted successfully` });
};
exports.deleteTask = deleteTask;
// module.exports = {
//   getAllTasks,
//   getTask,
//   addTask,
//   deleteTask,
//   updateTask,
// };
