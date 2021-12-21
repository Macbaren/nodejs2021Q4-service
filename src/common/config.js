import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  PORT,
  AUTH_MODE,
} = process.env;
