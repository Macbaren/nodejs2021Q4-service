"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoardOps = exports.updateBoardOps = exports.postBoardOps = exports.getBoardOps = exports.getAllBoardsOps = exports.Board = void 0;
const uuid_1 = require("uuid");
const boards_service_1 = require("./boards.service");
class Board {
    /**
     * Create new board by title and columns and generate id by uuid v4.
     * @param boardFromFE - board object IBoardReqBody.
     * @returns board object with id === uuid v4 IBoardResBody.
     */
    constructor(boardFromFE) {
        this.id = (0, uuid_1.v4)();
        this.title = boardFromFE.title;
        this.columns = boardFromFE.columns;
    }
}
exports.Board = Board;
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
exports.getAllBoardsOps = {
    schema: {
        response: {
            200: {
                type: 'array',
                boards: BoardBody,
            },
        },
    },
    handler: boards_service_1.getAllBoards,
};
// Options for single board
exports.getBoardOps = {
    schema: {
        response: {
            200: BoardBody,
        },
    },
    handler: boards_service_1.getBoard,
};
// Options for adding board
exports.postBoardOps = {
    schema: {
        body: BoardBodyReq,
        response: {
            201: BoardBody,
        },
    },
    handler: boards_service_1.addBoard,
};
// Options for updating board
exports.updateBoardOps = {
    schema: {
        response: {
            200: BoardBody,
        },
    },
    handler: boards_service_1.updateBoard,
};
// Options for single board
exports.deleteBoardOps = {
    handler: boards_service_1.deleteBoard,
};
