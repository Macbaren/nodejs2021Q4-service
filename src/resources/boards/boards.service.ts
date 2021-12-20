import { FastifyReply, FastifyRequest } from "fastify";
import { TaskBody } from '../tasks/tasks.service'

const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');

let boards = require('./boards.repository');
let tasks = require('../tasks/tasks.repository');

interface BoardParams {
  boardId: string;
}

type ColumnType = {
  id: string, title: string, columns: string
}

interface BoardBody {
  id: string,
  title: string,
  columns: ColumnType,
}

type BoardRequest = FastifyRequest<{
  Params: BoardParams,
  Body: BoardBody,
}>

const findBoard = (id: string) => boards.find((b: BoardBody) => b.id === id);

// GET /boards - get all boards
const getAllBoards = (request: FastifyRequest, reply: FastifyReply) => {
  reply.send(boards);
};

// GET /boards/:boardId - get the board by boardId
const getBoard = (request: BoardRequest, reply: FastifyReply) => {
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
const addBoard = (request: BoardRequest, reply: FastifyReply) => {
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
const updateBoard = (request: BoardRequest, reply: FastifyReply) => {
  const { boardId } = request.params;

  if (!isUuid(boardId)) {
    reply.code(400).send({ message: 'boardId is not uuid format' });
  }

  const board = findBoard(boardId);

  if (board === undefined) {
    reply.code(404).send({ message: `board with boardId: ${boardId} did not found` });
  }

  const { title, columns } = request.body;

  boards = boards.map((b: BoardBody) => (b.id === boardId ? { boardId, title, columns } : b));



  reply.send(board);
};

// DELETE /boards/:boardId - delete board
const deleteBoard = (request: BoardRequest, reply: FastifyReply) => {
  const { boardId } = request.params;

  if (!isUuid(boardId)) {
    reply.code(400).send({ message: 'boardId is not uuid format' });
  }

  const board = findBoard(boardId);

  if (board === undefined) {
    reply.code(404).send({ message: `board with boardId: ${boardId} did not found` });
  }

  boards = boards.filter((b: BoardBody) => b.id !== boardId);
  
  tasks = tasks.filter((t: TaskBody) => t.boardId !== boardId)

  reply.send({ message: `board ${boardId} deleted successfully` });
};

export {
  getAllBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
};
