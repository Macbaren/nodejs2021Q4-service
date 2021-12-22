import { IBoardResBody, ITaskResBody } from '../../common/interfaces';
import { removeBoardTasks } from '../tasks/tasks.repository';

const boards: IBoardResBody[] = [];

export const boardsDbFunctions = {
  // GET method, api /boards
  getAllBoards: async () => boards,

  // GET method, api /boards/:boardId
  getBoard: async (id: IBoardResBody['id']) => {
    const board = boards.find((b) => b.id === id);
    return board;
  },

  // POST method, api /boards
  addBoard: async (newBoard: IBoardResBody) => {
    boards.push(newBoard);
  },

  // PUT method, api /boards/:boardId
  updateBoard: async (id: IBoardResBody['id'], board: IBoardResBody) => {
    const updBoardIndex = boards.findIndex((b) => b.id === id);

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

export const isBoardExist = (id: ITaskResBody['boardId']) => boards.some((board) => board.id === id);
