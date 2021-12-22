import isUuid from 'uuid-validate';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  IUserReqBody,
  IUserReqParam,
  IUserResBody,
} from '../../common/interfaces';
import { usersDbFunctions } from './users.repository';
import { User } from './users.model';

// GET method, api /users
export const getAllUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  const users: IUserResBody[] = await usersDbFunctions.getAllUsers();

  reply.send(users);
};

// GET method, api /users/:userId
export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as IUserReqParam;

  if (!isUuid(userId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const user: IUserReqBody | undefined = await usersDbFunctions.getUser(userId);

  if (!user) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  } else reply.send(user);
};

// POST method, api /users
export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const newUser: IUserResBody = new User(request.body as IUserReqBody);

  await usersDbFunctions.addUser(newUser);

  reply.code(201).send(newUser);
};

// PUT method, api /users/:userId
export const updateUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = request.params as IUserReqParam;

  if (!isUuid(userId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const user: IUserResBody = new User(request.body as IUserReqBody);

  const updatedUser = await usersDbFunctions.updateUser(userId, user);

  if (!updatedUser) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  } else reply.send(updatedUser);
};

// DELETE method, api /users/:userId
export const deleteUser = (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as IUserReqParam;

  if (!isUuid(userId)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const deletedUser = usersDbFunctions.deleteUser(userId);

  if (!deletedUser) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  } else
    reply.send({ message: `user ${userId} has been deleted successfully` });
};
