"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserOps = exports.deleteUserOps = exports.postUserOps = exports.getUserOps = exports.getAllUsersOps = exports.User = void 0;
const { getAllUsers, getUser, addUser, deleteUser, updateUser, } = require('./users.service');
// user schema
exports.User = {
    type: 'object',
    properties: {
        id: { type: 'string' },
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
                users: exports.User,
            },
        },
    },
    handler: getAllUsers,
};
// Options for single user
exports.getUserOps = {
    schema: {
        response: {
            200: exports.User,
        },
    },
    handler: getUser,
};
// Options for adding user
exports.postUserOps = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'login', 'password'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            201: exports.User,
        },
    },
    handler: addUser,
};
// Options for deleting user
exports.deleteUserOps = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteUser
};
// Options for updating user
exports.updateUserOps = {
    schema: {
        response: {
            200: exports.User,
        },
    },
    handler: updateUser,
};
// export default User, 
//   getAllUsersOps,
//   getUserOps,
//   postUserOps,
//   deleteUserOps,
//   updateUserOps
