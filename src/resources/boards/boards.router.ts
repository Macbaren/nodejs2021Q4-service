import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  getAllBoardsOps,
  getBoardOps,
  postBoardOps,
  updateBoardOps,
  deleteBoardOps,
} from './boards.model';

export function boardsRoutes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  // get all boards
  fastify.get('/boards', getAllBoardsOps);
  // get required board
  fastify.get('/boards/:boardId', getBoardOps);
  // add board
  fastify.post('/boards', postBoardOps);
  // update board
  fastify.put('/boards/:boardId', updateBoardOps);
  // delete board
  fastify.delete('/boards/:boardId', deleteBoardOps);

  done();
}
