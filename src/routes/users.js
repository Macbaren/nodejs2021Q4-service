const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} = require('../controllers/users');
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

// Options for single user
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

function usersRoutes(fastify, options, done) {
  // get all users
  fastify.get('/users', getAllUsersOps);
  // get required user
  fastify.get('/users/:id', getUserOps);
  // add user
  fastify.post('/users', postUserOps);
  // delete user
  fastify.delete('/users/:id', deleteUserOps);
  // update user
  fastify.put('/users/:id', updateUserOps);

  done();
}

module.exports = usersRoutes;
