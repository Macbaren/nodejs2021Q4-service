"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const { getAllUsersOps, getUserOps, postUserOps, deleteUserOps, updateUserOps, } = require('./users.model');
function usersRoutes(fastify, done) {
    // get all users
    fastify.get('/users', getAllUsersOps);
    // get required user
    fastify.get('/users/:userId', getUserOps);
    // add user
    fastify.post('/users', postUserOps);
    // update user
    fastify.put('/users/:id', updateUserOps);
    // delete user
    fastify.delete('/users/:userId', deleteUserOps);
    done();
}
exports.usersRoutes = usersRoutes;
