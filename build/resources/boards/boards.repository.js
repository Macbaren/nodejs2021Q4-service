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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBoardExist = exports.boardsDbFunctions = void 0;
const tasks_repository_1 = require("../tasks/tasks.repository");
const boards = [
// {
//   id: 'ba2c0425-e192-44a2-8329-f309b14e4019',
//   title: 'Board 1',
//   columns: [],
// },
// {
//   id: '371026a1-2e76-44a3-a699-c485b3c59cb2',
//   title: 'Board 2',
//   columns: [],
// },
// {
//   id: 'a8407d83-82a2-47c1-8dd0-02f08e27447f',
//   title: 'Board 3',
//   columns: [],
// },
];
exports.boardsDbFunctions = {
    // GET method, api /boards
    getAllBoards: () => __awaiter(void 0, void 0, void 0, function* () { return boards; }),
    // GET method, api /boards/:boardId
    getBoard: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const board = boards.find((board) => board.id === id);
        return board;
    }),
    // POST method, api /boards
    addBoard: (newBoard) => __awaiter(void 0, void 0, void 0, function* () {
        boards.push(newBoard);
    }),
    // PUT method, api /boards/:boardId
    updateBoard: (id, board) => __awaiter(void 0, void 0, void 0, function* () {
        const updBoardIndex = boards.findIndex((board) => board.id === id);
        if (updBoardIndex < 0)
            return null;
        boards[updBoardIndex] = Object.assign(Object.assign({}, board), { id });
        return Object.assign(Object.assign({}, board), { id });
    }),
    deleteBoard: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const delBoardIndex = boards.findIndex((board) => board.id === id);
        (0, tasks_repository_1.removeBoardTasks)(id);
        boards.splice(delBoardIndex, 1);
        return delBoardIndex;
    }),
};
const isBoardExist = (id) => {
    return boards.some((board) => board.id === id);
};
exports.isBoardExist = isBoardExist;
