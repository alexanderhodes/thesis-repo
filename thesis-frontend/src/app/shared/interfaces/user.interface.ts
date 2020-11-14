import {Permission} from './permission.interface';

export interface User {
  id: string;
  username: string;
  publicKey: string;
  permissions: Permission[];
}

export interface CreateUser {
  password: string;
  username: string;
  permissions: Permission[];
}

export interface CreatedUser {
  id: string;
  privateKey: string;
  username: string;
}
