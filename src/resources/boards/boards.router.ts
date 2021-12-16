import { FastifyInstance } from "fastify";

const {
  getAllBoardsOps,
  getBoardOps,
  postBoardOps,
  deleteBoardOps,
  updateBoardOps,
} = require('./boards.model');

export function boardsRoutes(fastify: FastifyInstance, done: Function) {
  // get all boards
  fastify.get('/boards', getAllBoardsOps);
  // get required board
  fastify.get('/boards/:boardId', getBoardOps);
  // add board
  fastify.post('/boards', postBoardOps);  
  // update board
  fastify.put('/boards/:id', updateBoardOps);
  // delete board
  fastify.delete('/boards/:id', deleteBoardOps);
  done();
}
