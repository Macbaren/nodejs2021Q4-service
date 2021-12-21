"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserFromTask = exports.tasks = void 0;
exports.tasks = [
// {
//   id: '79e8cb6f-4e75-42ad-83c3-cd1f190745c8',
//   title: 'Task 1',
//   order: 1,
//   description: 'Board 1 Column 1',
//   userId: '570d94f6-278b-41c2-9e48-e8cb94165e95',
//   boardId: 'ba2c0425-e192-44a2-8329-f309b14e4019',
//   columnId: '123',
// },
// {
//   id: '65feea19-ea4e-42e7-ad9c-849a24e016b0',
//   title: 'Task 2',
//   order: 2,
//   description: 'Board 1 Column 2',
//   userId: '44dd8eca-f741-4977-ab88-adee842fa45e',
//   boardId: 'ba2c0425-e192-44a2-8329-f309b14e4019',
//   columnId: '2',
// },
// {
//   id: 'e7b3deed-4fd3-463e-a5f7-f060d0fa8778',
//   title: 'Task 3',
//   order: 3,
//   description: 'Board 1 Column 3',
//   userId: '44dd8eca-f741-4977-ab88-adee842fa45e',
//   boardId: '570d94f6-278b-41c2-9e48-e8cb94165e94',
//   columnId: '3',
// },
];
const deleteUserFromTask = (userId) => {
    exports.tasks.map((t) => (t.userId === userId ? Object.assign(Object.assign({}, t), { userId: null }) : t));
};
exports.deleteUserFromTask = deleteUserFromTask;
module.exports = exports.tasks;
