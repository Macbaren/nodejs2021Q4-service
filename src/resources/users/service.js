const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');

let users = require('./database');

const findUser = (id) => users.find((u) => u.id === id);

const noPasswordUser = (user) => {
  const npUser = JSON.parse(JSON.stringify(user));
  delete npUser.password;
  return npUser;
};

// GET method, api /users
const getAllUsers = (request, reply) => {
  const noPasswordUsers = users.map((user) => noPasswordUser(user));

  reply.send(noPasswordUsers);
};

// GET method, api /users/:id
const getUser = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const user = findUser(id);

  if (user === undefined) {
    reply.code(404).send({ message: `user with id: ${id} did not found` });
  }

  reply.send(noPasswordUser(user));
};

// POST method, api /users
const addUser = (request, reply) => {
  const { name, login, password } = request.body;

  const user = {
    id: uuidv4(),
    name,
    login,
    password,
  };

  users = [...users, user];

  reply.code(201).send(noPasswordUser(user));
};

// DELETE method, api /users/:id
const deleteUser = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const user = findUser(id);

  if (user === undefined) {
    reply.code(404).send({ message: `user with id: ${id} did not found` });
  }

  users = users.filter((u) => u.id !== id);

  reply.send({ message: `user ${id} deleted successfully` });
};

// PUT method, api /users/:id
const updateUser = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const user = findUser(id);

  if (user === undefined) {
    reply.code(404).send({ message: `user with id: ${id} did not found` });
  }

  const {
    name = user.name,
    login = user.login,
    password = user.password,
  } = request.body;

  users = users.map((it) =>
    it.id === id ? { id, name, login, password } : it
  );

  reply.send(noPasswordUser(user));
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
