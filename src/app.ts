const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});
fastify.register(require('./resources/users/users.router'));
fastify.register(require('./resources/boards/router'));
fastify.register(require('./resources/tasks/router'));

export default fastify;
