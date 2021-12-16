import { FastifyInstance } from "fastify";

const {
  getAllUsersOps,
  getUserOps,
  postUserOps,
  deleteUserOps,
  updateUserOps,
} = require('./users.model');

export function usersRoutes(fastify: FastifyInstance, done: Function) {
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

