const {
  getAllBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} = require('./boards.service');

// board schema
const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { type: 'array' },
  },
};

// Options for get all boards
const getAllBoardsOps = {
  schema: {
    response: {
      200: {
        type: 'array',
        boards: Board,
      },
    },
  },
  handler: getAllBoards,
};

// Options for single board
const getBoardOps = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: getBoard,
};

// Options for adding board
const postBoardOps = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: { type: 'array' },
      },
    },
    response: {
      201: Board,
    },
  },
  handler: addBoard,
};

// Options for single board
const deleteBoardOps = {
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
  handler: deleteBoard,
};

// Options for updating board
const updateBoardOps = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: updateBoard,
};

module.exports = {
  getAllBoardsOps,
  getBoardOps,
  postBoardOps,
  deleteBoardOps,
  updateBoardOps,
};
