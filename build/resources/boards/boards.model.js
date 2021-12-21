"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoardOps = exports.deleteBoardOps = exports.postBoardOps = exports.getBoardOps = exports.getAllBoardsOps = void 0;
const boards_service_1 = require("./boards.service");
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
    handler: boards_service_1.getAllBoards,
};
exports.getAllBoardsOps = getAllBoardsOps;
// Options for single board
const getBoardOps = {
    schema: {
        response: {
            200: Board,
        },
    },
    handler: boards_service_1.getBoard,
};
exports.getBoardOps = getBoardOps;
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
    handler: boards_service_1.addBoard,
};
exports.postBoardOps = postBoardOps;
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
    handler: boards_service_1.deleteBoard,
};
exports.deleteBoardOps = deleteBoardOps;
// Options for updating board
const updateBoardOps = {
    schema: {
        response: {
            200: Board,
        },
    },
    handler: boards_service_1.updateBoard,
};
exports.updateBoardOps = updateBoardOps;
