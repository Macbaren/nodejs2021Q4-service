import { v4 as uuid } from 'uuid';

import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} from './users.service';

export class User {
  public id;

  public name;

  public login;

  public password;

  /**
   * Create new user by object with fields name, login, password.
   * @param param0 - user object with fields name string, user string and password string.
   * @returns user object with id === uuid v4 IUserResBody.
   */

  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

// user schema
export const UserBody = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

// user required schema
const UserBodyReq = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

// Options for get all users
export const getAllUsersOps = {
  schema: {
    response: {
      200: {
        type: 'array',
        users: UserBody,
      },
    },
  },
  handler: getAllUsers,
};

// Options for single user
export const getUserOps = {
  schema: {
    response: {
      200: UserBody,
    },
  },
  handler: getUser,
};

// Options for adding user
export const postUserOps = {
  schema: {
    body: UserBodyReq,
    response: {
      201: UserBody,
    },
  },
  handler: addUser,
};

// Options for updating user
export const updateUserOps = {
  schema: {
    body: UserBodyReq,
    response: {
      200: UserBody,
    },
  },
  handler: updateUser,
};

// Options for deleting user
export const deleteUserOps = {
  handler: deleteUser,
};
