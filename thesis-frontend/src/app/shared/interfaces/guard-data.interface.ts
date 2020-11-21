import {Role} from './role.interface';
import {Permission} from './permission.interface';

export interface GuardData {
  roles: Role[];
  permissions: Permission[];
}
