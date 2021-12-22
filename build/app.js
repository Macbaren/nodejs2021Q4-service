"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_swagger_1 = require("fastify-swagger");
const path = __importStar(require("path"));
const user_router_1 = require("./resources/users/user.router");
const board_router_1 = require("./resources/boards/board.router");
const task_router_1 = require("./resources/tasks/task.router");
exports.server = (0, fastify_1.default)({ logger: true });
exports.server.register(user_router_1.userRoutes);
exports.server.register(board_router_1.boardRoutes);
exports.server.register(task_router_1.taskRoutes);
exports.server.register(fastify_swagger_1.fastifySwagger, {
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
const mainRoute = (req, reply) => {
    if (req.url === '/') {
        reply.send('Service is running!');
    }
    else {
        reply.send('Something went wrong');
    }
};
exports.server.get('/', mainRoute);
