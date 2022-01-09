import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const { 
  PORT, 
  NODE_ENV, 
  MONGO_CONNECTION_STRING, 
  JWT_SECRET_KEY, AUTH_MODE
} = process.env;
