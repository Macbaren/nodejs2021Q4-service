const { v4: uuidv4 } = require('uuid');

let users = require('../databases/Users');

const getAllUsers = (request, reply) => {
  reply.send(users);
};

const getUser = (request, reply) => {
  const { id } = request.params;
  const user = users.find((u) => u.id === id);
  reply.send(user);
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

  users = users.filter((user) => user.id !== id);

  reply.send({ message: `user ${id} deleted successfully` });
};

const updateUser = (request, reply) => {
  const { id } = request.params;
  const { name, login, password } = request.body;

  users = users.map((it) =>
    it.id === id ? { id, name, login, password } : it
  );

  // const user = users.filter((u) => u.id === id);

  reply.send(`user ${id} updated successfully`);
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
