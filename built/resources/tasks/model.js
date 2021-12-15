"use strict";
const { getAllTasks, getTask, addTask, deleteTask, updateTask, } = require('./service');
// task schema
const Task = {
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
const getAllTasksOps = {
    schema: {
        response: {
            200: {
                type: 'array',
                tasks: Task,
            },
        },
    },
    handler: getAllTasks,
};
// Options for single task
const getTaskOps = {
    schema: {
        response: {
            200: Task,
        },
    },
    handler: getTask,
};
// Options for adding task
const postTaskOps = {
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
            201: Task,
        },
    },
    handler: addTask,
};
// Options for single task
const deleteTaskOps = {
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
const updateTaskOps = {
    schema: {
        response: {
            200: Task,
        },
    },
    handler: updateTask,
};
module.exports = {
    getAllTasksOps,
    getTaskOps,
    postTaskOps,
    deleteTaskOps,
    updateTaskOps,
};
