import {
  IBoardResBody,
  ITaskResBody,
  IUserResBody,
} from '../../common/interfaces';
import { isBoardExist } from '../boards/boards.repository';

const tasks: ITaskResBody[] = [
  // {
  //   id: '79e8cb6f-4e75-42ad-83c3-cd1f190745c8',
  //   title: 'Task 1',
  //   order: 1,
  //   description: 'Board 1 Column 1',
  //   userId: '570d94f6-278b-41c2-9e48-e8cb94165e95',
  //   boardId: 'ba2c0425-e192-44a2-8329-f309b14e4019',
  //   columnId: '123',
  // },
  // {
  //   id: '65feea19-ea4e-42e7-ad9c-849a24e016b0',
  //   title: 'Task 2',
  //   order: 2,
  //   description: 'Board 1 Column 2',
  //   userId: '44dd8eca-f741-4977-ab88-adee842fa45e',
  //   boardId: 'ba2c0425-e192-44a2-8329-f309b14e4019',
  //   columnId: '2',
  // },
  // {
  //   id: 'e7b3deed-4fd3-463e-a5f7-f060d0fa8778',
  //   title: 'Task 3',
  //   order: 3,
  //   description: 'Board 1 Column 3',
  //   userId: '44dd8eca-f741-4977-ab88-adee842fa45e',
  //   boardId: '570d94f6-278b-41c2-9e48-e8cb94165e94',
  //   columnId: '3',
  // },
];

export const tasksDbFunctions = {
  // GET boards/:boardId/tasks - get all tasks
  getAllTasks: async (boardId: ITaskResBody['boardId']) => {
    if (isBoardExist(boardId)) {
      const allTasks = tasks.filter((task) => task.boardId === boardId);
      return allTasks;
    }
    return null;
  },

  // GET boards/:boardId/tasks/:taskId - get the task by id
  getTask: async (
    boardId: ITaskResBody['boardId'],
    taskId: ITaskResBody['id']
  ) => {
    if (isBoardExist(boardId)) {
      const boardTasks = tasks.filter(
        (boardTask) => boardTask.boardId === boardId
      );
      const task = boardTasks.find((t) => t.id === taskId);

      if (!task) {
        return null;
      }
      return task;
    }
    return null;
  },

  // POST boards/:boardId/tasks - create task
  addTask: async (boardId: ITaskResBody['boardId'], task: ITaskResBody) => {
    if (isBoardExist(boardId)) {
      const taskObj = { ...task, boardId };
      tasks.push(taskObj);
      return taskObj;
    }
    return null;
  },

  // PUT boards/:boardId/tasks/:taskId - update task
  updateTask: async (
    taskId: ITaskResBody['id'],
    boardId: ITaskResBody['boardId'],
    task: ITaskResBody
  ) => {
    if (isBoardExist(boardId)) {
      const index = tasks.findIndex((elem) => elem.id === taskId);
      if (index < 0) {
        return null;
      }
      tasks[index] = { ...task, boardId, id: taskId };
      return tasks[index];
    }
    return null;
  },

  // DELETE boards/:boardId/tasks/:taskId - delete task
  deleteTask: async (
    taskId: ITaskResBody['id'],
    boardId: ITaskResBody['boardId']
  ) => {
    if (isBoardExist(boardId)) {
      const index = tasks.findIndex((task) => task.id === taskId);
      if (index < 0) {
        return null;
      }
      tasks.splice(index, 1);
      return index;
    }
    return null;
  },
};

export const setUsersIdToNull = async (id: IUserResBody['id']) => {
  tasks.forEach((task, ind) => {
    if (task.userId === id ?? tasks[ind]) {
      tasks[ind].userId = null;
    }
  });
};

export const removeBoardTasks = async (id: IBoardResBody['id']) => {
  tasks.forEach((task, ind) => {
    if (task.boardId === id) {
      tasks.splice(ind, 1);
    }
  });
};
