const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});
fastify.register(require('./resources/users/router'));
fastify.register(require('./resources/boards/router'));
fastify.register(require('./resources/tasks/router'));

const { PORT } = require('./common/config');

const start = async () => {
  try {
    await fastify.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`App is running on http://localhost:${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
