import {Role} from './role.interface';

export interface User {
  id: string;
  username: string;
  publicKey: string;
  roles: Role[];
}

export interface CreateUser {
  password: string;
  username: string;
  roles: Role[];
}

export interface CreatedUser {
  id: string;
  privateKey: string;
  username: string;
  publicKey: string;
  roles: Role[];
}

export interface UpdateUserPassword {
  user: string;
  password: string;
}
