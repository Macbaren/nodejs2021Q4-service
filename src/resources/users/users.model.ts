const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} = require('./users.service');
// user schema
export const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

// Options for get all users
export const getAllUsersOps = {
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
export const getUserOps = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

// Options for adding user
export const postUserOps = {
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
export const deleteUserOps = {
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
export const updateUserOps = {
  schema: {
    response: {
      200: User,
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
