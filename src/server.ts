import fastify from 'fastify'

const { PORT } = require('./common/config');

const start = async () => {
  const server = fastify({ logger: true })

  await server.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'fastify-api' },
    },
  });
  await server.register(require('./resources/users/users.router'));
  await server.register(require('./resources/boards/boards.router'));
  await server.register(require('./resources/tasks/tasks.router'));

  try {
    await server.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`App is running on http://localhost:${PORT}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();

// const fastify = require('fastify')({ logger: true });


// export default fastify;
