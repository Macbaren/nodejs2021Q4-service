"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require('uuid');
const isUuid = require('uuid-validate');
let { users } = require('./users.repository');
const { getAll } = require('./users.repository');
let tasks = require('../tasks/database');
const findUser = (id) => users.find((u) => u.userId === id);
const noPasswordUser = (user) => {
    const npUser = JSON.parse(JSON.stringify(user));
    delete npUser.password;
    return npUser;
};
// GET method, api /users
const getAllUsers = (request, reply) => {
    // const noPasswordUsers = users.map((user) => noPasswordUser(user));
    reply.send(getAll());
};
// GET method, api /users/:userId
const getUser = (request, reply) => {
    const { userId } = request.params;
    if (!isUuid(userId)) {
        reply.code(400).send({ message: 'userId is not uuid format' });
    }
    const user = findUser(userId);
    if (user === undefined) {
        reply.code(404).send({ message: `user with userId: ${userId} did not found` });
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
// PUT method, api /users/:userId
const updateUser = (request, reply) => {
    const { userId } = request.params;
    if (!isUuid(userId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const user = findUser(userId);
    if (user === undefined) {
        reply.code(404).send({ message: `user with id: ${userId} did not found` });
    }
    const { name = user.name, login = user.login, password = user.password } = request.body;
    users = users.map((it) => it.userId === userId ? { userId, name, login, password } : it);
    reply.send(noPasswordUser(user));
};
// DELETE method, api /users/:userId
const deleteUser = (request, reply) => {
    const { userId } = request.params;
    if (!isUuid(userId)) {
        reply.code(400).send({ message: 'userId is not uuid format' });
    }
    const user = findUser(userId);
    if (user === undefined) {
        reply.code(404).send({ message: `user with userId: ${userId} did not found` });
    }
    users = users.filter((u) => u.userId !== userId);
    // tasks = tasks.map((t: taskBody) => (t.userId === userId ? { ...t, userId: null } : t));
    reply.send({ message: `user ${userId} deleted successfully` });
};
module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
};
