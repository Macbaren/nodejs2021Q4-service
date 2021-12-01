const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');

let boards = require('./database');

const findBoard = (id) => boards.find((u) => u.id === id);

const getAllBoards = (request, reply) => {
  reply.send(boards);
};

const getBoard = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const board = findBoard(id);

  if (board === undefined) {
    reply.code(404).send({ message: `board with id: ${id} did not found` });
  }

  reply.send(board);
};

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

const deleteBoard = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const board = findBoard(id);

  if (board === undefined) {
    reply.code(404).send({ message: `board with id: ${id} did not found` });
  }

  boards = boards.filter((u) => u.id !== id);

  reply.send({ message: `board ${id} deleted successfully` });
};

const updateBoard = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const board = findBoard(id);

  if (board === undefined) {
    reply.code(404).send({ message: `board with id: ${id} did not found` });
  }

  const {
    name = board.name,
    login = board.login,
    password = board.password,
  } = request.body;

  boards = boards.map((it) =>
    it.id === id ? { id, name, login, password } : it
  );

  reply.send(`board ${id} updated successfully`);
};

module.exports = {
  getAllBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
};
