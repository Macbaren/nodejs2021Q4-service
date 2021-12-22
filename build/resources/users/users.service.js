"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUser = exports.getAllUsers = void 0;
const uuid_validate_1 = __importDefault(require("uuid-validate"));
const users_repository_1 = require("./users.repository");
const users_model_1 = require("./users.model");
// GET method, api /users
const getAllUsers = (_, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_repository_1.usersDbFunctions.getAllUsers();
    reply.send(users);
});
exports.getAllUsers = getAllUsers;
// GET method, api /users/:userId
const getUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.params;
    if (!(0, uuid_validate_1.default)(userId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const user = yield users_repository_1.usersDbFunctions.getUser(userId);
    if (!user) {
        reply.code(404).send({ message: `user with id: ${userId} did not found` });
    }
    else
        reply.send(user);
});
exports.getUser = getUser;
// POST method, api /users
const addUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new users_model_1.User(request.body);
    yield users_repository_1.usersDbFunctions.addUser(newUser);
    reply.code(201).send(newUser);
});
exports.addUser = addUser;
// PUT method, api /users/:userId
const updateUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.params;
    if (!(0, uuid_validate_1.default)(userId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const user = new users_model_1.User(request.body);
    const updatedUser = yield users_repository_1.usersDbFunctions.updateUser(userId, user);
    if (!updatedUser) {
        reply.code(404).send({ message: `user with id: ${userId} did not found` });
    }
    else
        reply.send(updatedUser);
});
exports.updateUser = updateUser;
// DELETE method, api /users/:userId
const deleteUser = (request, reply) => {
    const { userId } = request.params;
    if (!(0, uuid_validate_1.default)(userId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const deletedUser = users_repository_1.usersDbFunctions.deleteUser(userId);
    if (!deletedUser) {
        reply.code(404).send({ message: `user with id: ${userId} did not found` });
    }
    else
        reply.send({ message: `user ${userId} has been deleted successfully` });
};
exports.deleteUser = deleteUser;
