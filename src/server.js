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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const { PORT } = require('./common/config');
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = (0, fastify_1.default)({ logger: true });
    yield server.register(require('fastify-swagger'), {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: { title: 'fastify-api' },
        },
    });
    yield server.register(require('./resources/users/users.router'));
    yield server.register(require('./resources/boards/boards.router'));
    yield server.register(require('./resources/tasks/tasks.router'));
    try {
        yield server.listen(PORT);
        // eslint-disable-next-line no-console
        console.log(`App is running on http://localhost:${PORT}`);
    }
    catch (error) {
        server.log.error(error);
        process.exit(1);
    }
});
start();
// const fastify = require('fastify')({ logger: true });
// export default fastify;
