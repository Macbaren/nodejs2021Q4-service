"use strict";
const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');
let boards = require('./boards.repository');
let tasks = require('../tasks/tasks.repository');
const findBoard = (id) => boards.find((b) => b.id === id);
// GET /boards - get all boards
const getAllBoards = (request, reply) => {
    reply.send(boards);
};
// GET /boards/:boardId - get the board by boardId
const getBoard = (request, reply) => {
    const { boardId } = request.params;
    if (!isUuid(boardId)) {
        reply.code(400).send({ message: 'boardId is not uuid format' });
    }
    const board = findBoard(boardId);
    if (board === undefined) {
        reply.code(404).send({ message: `board with boardId: ${boardId} did not found` });
    }
    reply.send(board);
};
// POST /boards - create board
const addBoard = (request, reply) => {
    const { title, columns } = request.body;
    const board = {
        id: uuidv4(),
        title,
        columns,
    };
    boards = [...boards, board];
    reply.code(201).send(board);
};
// PUT /boards/:boardId - update board
const updateBoard = (request, reply) => {
    const { boardId } = request.params;
    if (!isUuid(boardId)) {
        reply.code(400).send({ message: 'boardId is not uuid format' });
    }
    const board = findBoard(boardId);
    if (board === undefined) {
        reply.code(404).send({ message: `board with boardId: ${boardId} did not found` });
    }
    const { title, columns } = request.body;
    boards = boards.map((b) => (b.id === boardId ? { boardId, title, columns } : b));
    reply.send(board);
};
// DELETE /boards/:boardId - delete board
const deleteBoard = (request, reply) => {
    const { boardId } = request.params;
    if (!isUuid(boardId)) {
        reply.code(400).send({ message: 'boardId is not uuid format' });
    }
    const board = findBoard(boardId);
    if (board === undefined) {
        reply.code(404).send({ message: `board with boardId: ${boardId} did not found` });
    }
    boards = boards.filter((b) => b.id !== boardId);
    tasks = tasks.filter((t) => t.boardId !== boardId);
    reply.send({ message: `board ${boardId} deleted successfully` });
};
module.exports = {
    getAllBoards,
    getBoard,
    addBoard,
    deleteBoard,
    updateBoard,
};
