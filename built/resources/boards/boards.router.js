"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsRoutes = void 0;
const { getAllBoardsOps, getBoardOps, postBoardOps, deleteBoardOps, updateBoardOps, } = require('./boards.model');
function boardsRoutes(fastify, done) {
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
exports.boardsRoutes = boardsRoutes;
