"use strict";
const { getAllBoardsOps, getBoardOps, postBoardOps, deleteBoardOps, updateBoardOps, } = require('./model');
function boardsRoutes(fastify, options, done) {
    // get all boards
    fastify.get('/boards', getAllBoardsOps);
    // get required board
    fastify.get('/boards/:id', getBoardOps);
    // add board
    fastify.post('/boards', postBoardOps);
    // delete board
    fastify.delete('/boards/:id', deleteBoardOps);
    // update board
    fastify.put('/boards/:id', updateBoardOps);
    done();
}
module.exports = boardsRoutes;
