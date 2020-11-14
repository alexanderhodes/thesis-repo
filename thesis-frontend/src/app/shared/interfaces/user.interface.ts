import {Permission} from './permission.interface';

export interface User {
  id: string;
  username: string;
  publicKey: string;
  permissions: Permission[];
}
