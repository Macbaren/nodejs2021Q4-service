const {
  getAllTasksOps,
  getTaskOps,
  postTaskOps,
  deleteTaskOps,
  updateTaskOps,
} = require('./model');

function tasksRoutes(fastify, options, done) {
  // get all tasks
  fastify.get('/boards/:boardId/tasks', getAllTasksOps);
  // get required task
  fastify.get('/boards/:boardId/tasks/:id', getTaskOps);
  // add task
  fastify.post('/boards/:boardId/tasks', postTaskOps);
  // delete task
  fastify.delete('/boards/:boardId/tasks/:id', deleteTaskOps);
  // update task
  fastify.put('/boards/:boardId/tasks/:id', updateTaskOps);

  done();
}

module.exports = tasksRoutes;
