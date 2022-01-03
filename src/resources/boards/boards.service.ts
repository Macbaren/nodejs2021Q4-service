import isUuid from 'uuid-validate';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  IBoardReqBody,
  IBoardReqParam,
  IBoardResBody,
} from '../../common/interfaces';
import { boardsDbFunctions } from './boards.repository';
import { Board } from './boards.model';

// GET method, api /boards
export const getAllBoards = async (_: FastifyRequest, reply: FastifyReply) => {
  const boards: IBoardResBody[] = await boardsDbFunctions.getAllBoards();

  reply.send(boards);
};

// GET method, api /boards/:boardId
export const getBoard = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { boardId } = request.params as IBoardReqParam;

  if (!isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const board: IBoardReqBody | undefined = await boardsDbFunctions.getBoard(
    boardId
  );

  if (!board) {
    reply
      .code(404)
      .send({ message: `board with id: ${boardId} did not found` });
  } else reply.send(board);
};

// POST method, api /boards
export const addBoard = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const newBoard: IBoardResBody = new Board(request.body as IBoardReqBody);

  await boardsDbFunctions.addBoard(newBoard);

  reply.code(201).send(newBoard);
};

// PUT method, api /boards/:boardId
export const updateBoard = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { boardId } = request.params as IBoardReqParam;

  if (!isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const board: IBoardResBody = new Board(request.body as IBoardReqBody);

  const updatedBoard = await boardsDbFunctions.updateBoard(boardId, board);

  if (!updatedBoard) {
    reply
      .code(404)
      .send({ message: `board with id: ${boardId} did not found` });
  } else reply.send(updatedBoard);
};

// DELETE method, api /boards/:boardId
export const deleteBoard = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { boardId } = request.params as IBoardReqParam;

  if (!isUuid(boardId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const deletedBoardInd = await boardsDbFunctions.deleteBoard(boardId);

  if (deletedBoardInd < 0) {
    reply.code(404).send(`board with id: ${boardId} did not found`);
  } else reply.code(204);
  // .send({ message: `board ${boardId} has been deleted successfully` });
};
