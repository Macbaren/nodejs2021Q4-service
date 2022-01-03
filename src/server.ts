import { PORT } from './common/config';
import { server } from './app';

/**
 * Logging when App is running
 * @returns void
 */

const appRunLogging = () => {
  console.log(`Server starts at http://localhost:${PORT}`);
};

const start = async () => {
  try {
    await server.listen(PORT || 4000, appRunLogging);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
