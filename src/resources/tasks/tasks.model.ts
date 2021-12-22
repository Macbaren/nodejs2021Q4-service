import { v4 as uuid } from 'uuid';
import { ITaskReqBody } from '../../common/interfaces';

import {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from './tasks.service';

export class Task {
  id;

  title;

  order;

  description;

  userId;

  boardId: string;

  columnId;

  /**
   * Create new task by object with type ITaskReqBody and generate id by uuid v4.
   * @param taskFromFE - task object ITaskReqBody.
   * @returns task object with id === uuid v4 ITaskResBody.
   */

  constructor(taskFromFE: ITaskReqBody) {
    this.id = uuid();
    this.title = taskFromFE.title;
    this.order = taskFromFE.order;
    this.description = taskFromFE.description;
    this.userId = taskFromFE.userId;
    this.boardId = taskFromFE.boardId;
    this.columnId = taskFromFE.columnId;
  }
}

// task schema
export const TaskBody = {
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
export const getAllTasksOps = {
  schema: {
    response: {
      200: {
        type: 'array',
        tasks: TaskBody,
      },
    },
  },
  handler: getAllTasks,
};

// Options for single task
export const getTaskOps = {
  schema: {
    response: {
      200: TaskBody,
    },
  },
  handler: getTask,
};

// Options for adding task
export const postTaskOps = {
  schema: {
    body: TaskBodyReq,
    response: {
      201: TaskBody,
    },
  },
  handler: addTask,
};

// Options for updating task
export const updateTaskOps = {
  schema: {
    body: TaskBodyReq,
    response: {
      200: TaskBody,
    },
  },
  handler: updateTask,
};

// Options for single task
export const deleteTaskOps = {
  handler: deleteTask,
};
