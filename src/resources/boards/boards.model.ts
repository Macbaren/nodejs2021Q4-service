import { v4 as uuid } from 'uuid';

import { IBoardReqBody, IColumn } from '../../common/interfaces';
import {
  getAllBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} from './boards.service';

export class Board {
  public id;

  public title;

  public columns: IColumn[];

  /**
   * Create new board by title and columns and generate id by uuid v4.
   * @param boardFromFE - board object IBoardReqBody.
   * @returns board object with id === uuid v4 IBoardResBody.
   */

  constructor(boardFromFE: IBoardReqBody) {
    this.id = uuid();
    this.title = boardFromFE.title;
    this.columns = boardFromFE.columns;
  }
}

// board schema
const BoardBody = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'number' },
        },
      },
    },
  },
};

// board required schema
const BoardBodyReq = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          order: { type: 'number' },
        },
      },
    },
  },
};

// Options for get all boards
export const getAllBoardsOps = {
  schema: {
    response: {
      200: {
        type: 'array',
        boards: BoardBody,
      },
    },
  },
  handler: getAllBoards,
};

// Options for single board
export const getBoardOps = {
  schema: {
    response: {
      200: BoardBody,
    },
  },
  handler: getBoard,
};

// Options for adding board
export const postBoardOps = {
  schema: {
    body: BoardBodyReq,
    response: {
      201: BoardBody,
    },
  },
  handler: addBoard,
};

// Options for updating board
export const updateBoardOps = {
  schema: {
    response: {
      200: BoardBody,
    },
  },
  handler: updateBoard,
};

// Options for single board
export const deleteBoardOps = {
  handler: deleteBoard,
};
