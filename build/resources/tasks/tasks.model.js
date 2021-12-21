"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskOps = exports.deleteTaskOps = exports.postTaskOps = exports.getTaskOps = exports.getAllTasksOps = exports.Task = void 0;
const { getAllTasks, getTask, addTask, deleteTask, updateTask, } = require('./tasks.service');
// task schema
exports.Task = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        order: { type: 'number' },
        userId: { type: 'string' },
        boardId: { type: 'string' },
        columnId: { type: 'string' },
    },
};
// Options for get all tasks
exports.getAllTasksOps = {
    schema: {
        response: {
            200: {
                type: 'array',
                tasks: exports.Task,
            },
        },
    },
    handler: getAllTasks,
};
// Options for single task
exports.getTaskOps = {
    schema: {
        response: {
            200: exports.Task,
        },
    },
    handler: getTask,
};
// Options for adding task
exports.postTaskOps = {
    schema: {
        body: {
            type: 'object',
            required: [
                'title',
                'order',
                'description',
                'userId',
                'boardId',
                'columnId',
            ],
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                order: { type: 'number' },
                userId: { type: 'string' },
                boardId: { type: 'string' },
                columnId: { type: 'string' },
            },
        },
        response: {
            201: exports.Task,
        },
    },
    handler: addTask,
};
// Options for single task
exports.deleteTaskOps = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteTask,
};
// Options for updating task
exports.updateTaskOps = {
    schema: {
        response: {
            200: exports.Task,
        },
    },
    handler: updateTask,
};
// module.exports = {
//   getAllTasksOps,
//   getTaskOps,
//   postTaskOps,
//   deleteTaskOps,
//   updateTaskOps,
// };
