"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskOps = exports.updateTaskOps = exports.postTaskOps = exports.getTaskOps = exports.getAllTasksOps = exports.TaskBody = exports.Task = void 0;
const uuid_1 = require("uuid");
const tasks_service_1 = require("./tasks.service");
class Task {
    /**
     * Create new task by object with type ITaskReqBody and generate id by uuid v4.
     * @param taskFromFE - task object ITaskReqBody.
     * @returns task object with id === uuid v4 ITaskResBody.
     */
    constructor(taskFromFE) {
        this.id = (0, uuid_1.v4)();
        this.title = taskFromFE.title;
        this.order = taskFromFE.order;
        this.description = taskFromFE.description;
        this.userId = taskFromFE.userId;
        this.boardId = taskFromFE.boardId;
        this.columnId = taskFromFE.columnId;
    }
}
exports.Task = Task;
// task schema
exports.TaskBody = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: 'string' },
        columnId: { type: ['string', 'null'] },
    },
};
// task required schema
const TaskBodyReq = {
    type: 'object',
    required: ['title', 'order', 'description', 'userId'],
    properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
        boardId: { type: 'string' },
    },
};
// Options for get all tasks
exports.getAllTasksOps = {
    schema: {
        response: {
            200: {
                type: 'array',
                tasks: exports.TaskBody,
            },
        },
    },
    handler: tasks_service_1.getAllTasks,
};
// Options for single task
exports.getTaskOps = {
    schema: {
        response: {
            200: exports.TaskBody,
        },
    },
    handler: tasks_service_1.getTask,
};
// Options for adding task
exports.postTaskOps = {
    schema: {
        body: TaskBodyReq,
        response: {
            201: exports.TaskBody,
        },
    },
    handler: tasks_service_1.addTask,
};
// Options for updating task
exports.updateTaskOps = {
    schema: {
        body: TaskBodyReq,
        response: {
            200: exports.TaskBody,
        },
    },
    handler: tasks_service_1.updateTask,
};
// Options for single task
exports.deleteTaskOps = {
    handler: tasks_service_1.deleteTask,
};
