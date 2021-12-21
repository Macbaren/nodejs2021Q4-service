import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IUserReqBody,
  IUserReqParam,
  IUserResBody,
} from '../../common/interfaces';
import { usersDbFunctions } from './users.repository';

// const { v4: uuidv4 } = require('uuid');
import isUuid from 'uuid-validate';

// const findUser = (id) => users.find((u) => u.id === id);

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
// export const addUser = (request, reply) => {
//   const { name, login, password } = request.body;

//   const user = {
//     id: uuidv4(),
//     name,
//     login,
//     password,
//   };

//   users = [...users, user];

//   reply.code(201).send(noPasswordUser(user));
// };

// // DELETE method, api /users/:userId
// export const deleteUser = (request, reply) => {
//   const { id } = request.params;

//   if (!isUuid(id)) {
//     reply.code(400).send({ message: 'id is not uuid format' });
//   }

//   const user = findUser(id);

//   if (user === undefined) {
//     reply.code(404).send({ message: `user with id: ${id} did not found` });
//   }

//   users = users.filter((u) => u.id !== id);

//   tasks = tasks.map((t) => (t.userId === id ? { ...t, userId: null } : t));

//   reply.send({ message: `user ${id} deleted successfully` });
// };

// // PUT method, api /users/:userId
// export const updateUser = (request, reply) => {
//   const { id } = request.params;

//   if (!isUuid(id)) {
//     reply.code(400).send({ message: 'id is not uuid format' });
//   }

//   const user = findUser(id);

//   if (user === undefined) {
//     reply.code(404).send({ message: `user with id: ${id} did not found` });
//   }

//   const {
//     name = user.name,
//     login = user.login,
//     password = user.password,
//   } = request.body;

//   users = users.map((it) =>
//     it.id === id ? { id, name, login, password } : it
//   );

//   reply.send(noPasswordUser(user));
// };
