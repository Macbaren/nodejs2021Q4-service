"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const users_model_1 = require("./users.model");
function usersRoutes(fastify, _, done) {
    // get all users
    fastify.get('/users', users_model_1.getAllUsersOps);
    // get required user
    fastify.get('/users/:userId', users_model_1.getUserOps);
    // add user
    fastify.post('/users', users_model_1.postUserOps);
    // update user
    fastify.put('/users/:userId', users_model_1.updateUserOps);
    // delete user
    fastify.delete('/users/:userId', users_model_1.deleteUserOps);
    done();
}
exports.usersRoutes = usersRoutes;
