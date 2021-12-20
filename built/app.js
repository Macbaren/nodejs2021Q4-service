"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require('fastify')({ logger: true });
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-api' },
    },
});
fastify.register(require('./resources/users/users.router'));
fastify.register(require('./resources/boards/boards.router'));
fastify.register(require('./resources/tasks/tasks.router'));
exports.default = fastify();
