import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  getAllUsersOps,
  getUserOps,
  postUserOps,
  deleteUserOps,
  updateUserOps,
} from './users.model';

export function usersRoutes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  // get all users
  fastify.get('/users', getAllUsersOps);

  // get required user
  fastify.get('/users/:userId', getUserOps);

  // add user
  fastify.post('/users', postUserOps);

  // update user
  fastify.put('/users/:userId', updateUserOps);

  // delete user
  fastify.delete('/users/:userId', deleteUserOps);

  done();
}
