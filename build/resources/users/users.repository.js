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
exports.usersDbFunctions = void 0;
const tasks_repository_1 = require("../tasks/tasks.repository");
const users = [
// {
//   id: '44dd8eca-f741-4977-ab88-adee842fa45e',
//   name: 'Andrey 1',
//   login: 'Macbaren 1',
// },
// {
//   id: 'c2fa437a-bdb2-42ee-b48e-341e3d47f5c3',
//   name: 'Andrey 2',
//   login: 'Macbaren 2',
// },
// {
//   id: '6ff0e76a-f833-4139-a0a8-05d65fe4df7c',
//   name: 'Andrey 3',
//   login: 'Macbaren 3',
// },
// {
//   id: '1498188c-4b19-456c-8bef-3780a59472b6',
//   name: 'Andrey 4',
//   login: 'Macbaren 4',
// },
// {
//   id: '1b64db6b-d5dd-41a3-bee5-6f79c40312dd',
//   name: 'Andrey 5',
//   login: 'Macbaren 5',
// },
// {
//   id: 'c03898d5-6698-43b2-a15b-51603ea50bda',
//   name: 'Andrey 6',
//   login: 'Macbaren 6',
// },
// {
//   id: 'ce2c51e8-2925-428d-8d58-0b38458f9573',
//   name: 'Andrey 7',
//   login: 'Macbaren 7',
// },
// {
//   id: '0c5d40a7-d2e0-4538-8107-3a3fa114cbdb',
//   name: 'Andrey 8',
//   login: 'Macbaren 8',
// },
// {
//   id: '5499695a-0f60-4bd1-89e3-a36a884ca87f',
//   name: 'Andrey 9',
//   login: 'Macbaren 9',
// },
];
exports.usersDbFunctions = {
    // GET method, api /users
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () { return users; }),
    // GET method, api /users/:userId
    getUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = users.find((user) => user.id === id);
        return user;
    }),
    // POST method, api /users
    addUser: (newUser) => __awaiter(void 0, void 0, void 0, function* () {
        users.push(newUser);
    }),
    // PUT method, api /users/:userId
    updateUser: (id, user) => __awaiter(void 0, void 0, void 0, function* () {
        const updUserIndex = users.findIndex((user) => user.id === id);
        if (updUserIndex < 0)
            return null;
        users[updUserIndex] = Object.assign(Object.assign({}, user), { id });
        return Object.assign(Object.assign({}, user), { id });
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const delUserIndex = users.findIndex((user) => user.id === id);
        if (delUserIndex < 0)
            return null;
        yield (0, tasks_repository_1.setUsersIdToNull)(id);
        users.splice(delUserIndex, 1);
        return delUserIndex;
    }),
};
