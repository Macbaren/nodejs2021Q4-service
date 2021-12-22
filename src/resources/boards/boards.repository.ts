import {
  IBoardReqBody,
  IBoardReqParam,
  IBoardResBody,
  ITaskResBody,
} from '../../common/interfaces';
import { removeBoardTasks } from '../tasks/tasks.repository';

const boards: IBoardResBody[] = [
  // {
  //   id: 'ba2c0425-e192-44a2-8329-f309b14e4019',
  //   title: 'Board 1',
  //   columns: [],
  // },
  // {
  //   id: '371026a1-2e76-44a3-a699-c485b3c59cb2',
  //   title: 'Board 2',
  //   columns: [],
  // },
  // {
  //   id: 'a8407d83-82a2-47c1-8dd0-02f08e27447f',
  //   title: 'Board 3',
  //   columns: [],
  // },
];

export const boardsDbFunctions = {
  // GET method, api /boards
  getAllBoards: async () => boards,

  // GET method, api /boards/:boardId
  getBoard: async (id: IBoardResBody['id']) => {
    const board = boards.find((board) => board.id === id);
    return board;
  },

  // POST method, api /boards
  addBoard: async (newBoard: IBoardResBody) => {
    boards.push(newBoard);
  },

  // PUT method, api /boards/:boardId
  updateBoard: async (id: IBoardResBody['id'], board: IBoardResBody) => {
    const updBoardIndex = boards.findIndex((board) => board.id === id);

    if (updBoardIndex < 0) return null;

    boards[updBoardIndex] = { ...board, id };

    return { ...board, id };
  },

  deleteBoard: async (id: IBoardResBody['id']) => {
    const delBoardIndex = boards.findIndex((board) => board.id === id);

    removeBoardTasks(id);

    boards.splice(delBoardIndex, 1);

    return delBoardIndex;
  },
};

export const isBoardExist = (id: ITaskResBody['boardId']) => {
  return boards.some((board) => board.id === id);
};
