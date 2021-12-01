const {
  getAllBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} = require('./service');
// board schema
const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { type: 'string' },
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
      required: ['id', 'title', 'columns'],
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        columns: { type: 'string' },
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
