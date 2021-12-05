const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  unassignUser,
  updateUser,
} = require('./service');
// user schema
const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

// Options for get all users
const getAllUsersOps = {
  schema: {
    response: {
      200: {
        type: 'array',
        users: User,
      },
    },
  },
  handler: getAllUsers,
};

// Options for single user
const getUserOps = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

// Options for adding user
const postUserOps = {
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
      201: User,
    },
  },
  handler: addUser,
};

// Options for deleting user
const deleteUserOps = {
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
  handler: deleteUser,
  unassignUser,
};

// Options for updating user
const updateUserOps = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUser,
};

module.exports = {
  getAllUsersOps,
  getUserOps,
  postUserOps,
  deleteUserOps,
  updateUserOps,
};
