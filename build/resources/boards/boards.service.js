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
exports.deleteBoard = exports.updateBoard = exports.addBoard = exports.getBoard = exports.getAllBoards = void 0;
const uuid_validate_1 = __importDefault(require("uuid-validate"));
const boards_repository_1 = require("./boards.repository");
const boards_model_1 = require("./boards.model");
// GET method, api /boards
const getAllBoards = (_, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const boards = yield boards_repository_1.boardsDbFunctions.getAllBoards();
    reply.send(boards);
});
exports.getAllBoards = getAllBoards;
// GET method, api /boards/:boardId
const getBoard = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = request.params;
    if (!(0, uuid_validate_1.default)(boardId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const board = yield boards_repository_1.boardsDbFunctions.getBoard(boardId);
    if (!board) {
        reply
            .code(404)
            .send({ message: `board with id: ${boardId} did not found` });
    }
    else
        reply.send(board);
});
exports.getBoard = getBoard;
// POST method, api /boards
const addBoard = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const newBoard = new boards_model_1.Board(request.body);
    yield boards_repository_1.boardsDbFunctions.addBoard(newBoard);
    reply.code(201).send(newBoard);
});
exports.addBoard = addBoard;
// PUT method, api /boards/:boardId
const updateBoard = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = request.params;
    if (!(0, uuid_validate_1.default)(boardId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const board = new boards_model_1.Board(request.body);
    const updatedBoard = yield boards_repository_1.boardsDbFunctions.updateBoard(boardId, board);
    if (!updatedBoard) {
        reply
            .code(404)
            .send({ message: `board with id: ${boardId} did not found` });
    }
    else
        reply.send(updatedBoard);
});
exports.updateBoard = updateBoard;
// DELETE method, api /boards/:boardId
const deleteBoard = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = request.params;
    if (!(0, uuid_validate_1.default)(boardId)) {
        reply.code(400).send({ message: 'id is not uuid format' });
    }
    const deletedBoardInd = yield boards_repository_1.boardsDbFunctions.deleteBoard(boardId);
    if (deletedBoardInd < 0) {
        reply.code(404).send(`board with id: ${boardId} did not found`);
    }
    else
        reply.code(204);
    // .send({ message: `board ${boardId} has been deleted successfully` });
});
exports.deleteBoard = deleteBoard;
