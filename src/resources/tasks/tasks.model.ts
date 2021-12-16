const {
  getAllTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} = require('./tasks.service');

// task schema
export const Task = {
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
export const getAllTasksOps = {
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
export const getTaskOps = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

// Options for adding task
export const postTaskOps = {
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
export const deleteTaskOps = {
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
export const updateTaskOps = {
  schema: {
    response: {
      200: Task,
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
