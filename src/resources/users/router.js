const {
  getAllUsersOps,
  getUserOps,
  postUserOps,
  deleteUserOps,
  updateUserOps,
} = require('./model');

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
