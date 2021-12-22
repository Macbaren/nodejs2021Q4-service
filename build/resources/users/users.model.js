"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserOps = exports.updateUserOps = exports.postUserOps = exports.getUserOps = exports.getAllUsersOps = exports.UserBody = exports.User = void 0;
const uuid_1 = require("uuid");
const users_service_1 = require("./users.service");
class User {
    /**
     * Create new user by object with fields name, login, password.
     * @param param0 - user object with fields name string, user string and password string.
     * @returns user object with id === uuid v4 IUserResBody.
     */
    constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.login = login;
        this.password = password;
    }
}
exports.User = User;
// user schema
exports.UserBody = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
    },
};
// user required schema
const UserBodyReq = {
    type: 'object',
    required: ['name', 'login', 'password'],
    properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
    },
};
// Options for get all users
exports.getAllUsersOps = {
    schema: {
        response: {
            200: {
                type: 'array',
                users: exports.UserBody,
            },
        },
    },
    handler: users_service_1.getAllUsers,
};
// Options for single user
exports.getUserOps = {
    schema: {
        response: {
            200: exports.UserBody,
        },
    },
    handler: users_service_1.getUser,
};
// Options for adding user
exports.postUserOps = {
    schema: {
        body: UserBodyReq,
        response: {
            201: exports.UserBody,
        },
    },
    handler: users_service_1.addUser,
};
// Options for updating user
exports.updateUserOps = {
    schema: {
        body: UserBodyReq,
        response: {
            200: exports.UserBody,
        },
    },
    handler: users_service_1.updateUser,
};
// Options for deleting user
exports.deleteUserOps = {
    handler: users_service_1.deleteUser,
};
