import {Permission} from './permission.interface';

export interface Role {
  name: string;
  permissions: Permission[];
}
