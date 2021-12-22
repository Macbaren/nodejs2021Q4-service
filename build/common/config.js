"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_MODE = exports.JWT_SECRET_KEY = exports.MONGO_CONNECTION_STRING = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env')
});
_a = process.env, exports.PORT = _a.PORT, exports.NODE_ENV = _a.NODE_ENV, exports.MONGO_CONNECTION_STRING = _a.MONGO_CONNECTION_STRING, exports.JWT_SECRET_KEY = _a.JWT_SECRET_KEY, exports.AUTH_MODE = _a.AUTH_MODE;
