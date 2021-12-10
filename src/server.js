const { PORT } = require('./common/config');
const fastify = require('./app');

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
