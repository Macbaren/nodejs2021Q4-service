"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTask = exports.getAllTasks = void 0;
const uuid_validate_1 = __importDefault(require("uuid-validate"));
const tasks_repository_1 = require("./tasks.repository");
const tasks_model_1 = require("./tasks.model");
// GET boards/:boardId/tasks - get all tasks
const getAllTasks = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = request.params;
    if (!(0, uuid_validate_1.default)(boardId)) {
        reply.code(400).send({ message: 'boardId is not uuid format' });
    }
    const boardTasks = yield tasks_repository_1.tasksDbFunctions.getAllTasks(boardId);
    if (boardTasks === null) {
        reply
            .code(404)
            .send({ message: `board with id: ${boardId} did not found` });
    }
    else
        reply.send(boardTasks);
});
exports.getAllTasks = getAllTasks;
// GET boards/:boardId/tasks/:taskId - get the task by id
const getTask = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId, taskId } = request.params;
    if (!(0, uuid_validate_1.default)(taskId) || !(0, uuid_validate_1.default)(boardId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const task = yield tasks_repository_1.tasksDbFunctions.getTask(boardId, taskId);
    if (task === null) {
        reply.code(404).send({ message: `task with id: ${taskId} did not found` });
    }
    else
        reply.send(task);
});
exports.getTask = getTask;
// POST boards/:boardId/tasks - create task
const addTask = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = request.params;
    const newTask = new tasks_model_1.Task(request.body);
    const task = yield tasks_repository_1.tasksDbFunctions.addTask(boardId, newTask);
    if (task === null) {
        reply.code(404).send('Board not found');
    }
    else {
        reply.code(201).send(task);
    }
});
exports.addTask = addTask;
// PUT boards/:boardId/tasks/:taskId - update task
const updateTask = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId, boardId } = request.params;
    const newTask = new tasks_model_1.Task(request.body);
    if (!(0, uuid_validate_1.default)(taskId) || !(0, uuid_validate_1.default)(boardId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const task = yield tasks_repository_1.tasksDbFunctions.updateTask(taskId, boardId, newTask);
    if (task === null) {
        reply.code(404).send({ message: `task with id: ${taskId} did not found` });
    }
    else
        reply.send(task);
});
exports.updateTask = updateTask;
// DELETE boards/:boardId/tasks/:taskId - delete task
const deleteTask = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId, boardId } = request.params;
    const newTask = new tasks_model_1.Task(request.body);
    if (!(0, uuid_validate_1.default)(taskId) || !(0, uuid_validate_1.default)(boardId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const task = yield tasks_repository_1.tasksDbFunctions.updateTask(taskId, boardId, newTask);
    if (task === null) {
        reply.code(404).send({ message: `task with id: ${taskId} did not found` });
    }
    else
        reply.send(task);
});
exports.deleteTask = deleteTask;
