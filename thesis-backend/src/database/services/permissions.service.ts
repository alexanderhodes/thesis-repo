import {Injectable} from '@nestjs/common';
import {DeleteResult, InsertResult, Repository, UpdateResult} from 'typeorm';
import {Permission} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class PermissionsService {

    constructor(
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>
    ) {}

    findAll(): Promise<Permission[]> {
        return this.permissionsRepository.find();
    }

    findOne(name: string): Promise<Permission> {
        return this.permissionsRepository.findOne({ name: name });
    }

    insert(permission: Permission): Promise<InsertResult> {
        return this.permissionsRepository.insert(permission);
    }

    update(name: string, permission: Permission): Promise<UpdateResult> {
        return this.permissionsRepository.update({ name: name }, permission);
    }

    remove(name: string): Promise<DeleteResult> {
        return this.permissionsRepository.delete({ name: name });
    }

}
