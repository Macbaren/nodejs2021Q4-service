const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');

let users = require('./database');

const findUser = (id) => users.find((u) => u.id === id);

const getAllUsers = (request, reply) => {
  const noPasswordUsers = users.map((user) => {
    // eslint-disable-next-line no-param-reassign
    delete user.password;
    return user;
  });

  reply.send(noPasswordUsers);
};

const getUser = (request, reply) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    reply.code(400).send({ message: 'id is not uuid format' });
  }

  const user = findUser(id);

  if (user === undefined) {
    reply.code(404).send({ message: `user with id: ${id} did not found` });
  }

  const noPasswordUser = JSON.parse(JSON.stringify(user));

  delete noPasswordUser.password;

  reply.send(noPasswordUser);
};

const addUser = (request, reply) => {
  const { name, login, password } = request.body;

  const user = {
    id: uuidv4(),
    name,
    login,
    password,
  };

  users = [...users, user];

  reply.code(201).send(user);
};

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

  reply.send(`user ${id} updated successfully`);
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
