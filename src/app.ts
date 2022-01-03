import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { fastifySwagger } from 'fastify-swagger';
import * as path from 'path';
import { usersRoutes } from './resources/users/users.router';
import { boardsRoutes } from './resources/boards/boards.router';
import { tasksRoutes } from './resources/tasks/tasks.router';

export const server = fastify({
  logger: {
    level: 'info',
    file: './src/logs/allLogs.txt',
    prettyPrint: true,
    serializers: {
      res(reply) {
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          headers: request.headers,
        };
      },
    },
  },
});

server.register(usersRoutes);
server.register(boardsRoutes);
server.register(tasksRoutes);
server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: __dirname,
  },
});

/**
 * Handle main route and send message to front side if url === '/' or wrong message if url !== '/'
 * @param req - request to server from front side FastifyRequest.
 * @param reply - response from server to front side FastifyReply.
 * @returns void
 */

const mainRoute = (req: FastifyRequest, reply: FastifyReply) => {
  if (req.url === '/') {
    reply.send('Service is running!');
  } else {
    reply.send('Something went wrong');
  }
};

server.get('/', mainRoute);
