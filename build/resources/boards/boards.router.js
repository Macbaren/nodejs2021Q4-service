"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsRoutes = void 0;
const boards_model_1 = require("./boards.model");
function boardsRoutes(fastify, _, done) {
    // get all boards
    fastify.get('/boards', boards_model_1.getAllBoardsOps);
    // get required board
    fastify.get('/boards/:boardId', boards_model_1.getBoardOps);
    // add board
    fastify.post('/boards', boards_model_1.postBoardOps);
    // update board
    fastify.put('/boards/:boardId', boards_model_1.updateBoardOps);
    // delete board
    fastify.delete('/boards/:boardId', boards_model_1.deleteBoardOps);
    done();
}
exports.boardsRoutes = boardsRoutes;
