"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen(PORT);
        // eslint-disable-next-line no-console
        console.log(`App is running on http://localhost:${PORT}`);
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
});
start();
