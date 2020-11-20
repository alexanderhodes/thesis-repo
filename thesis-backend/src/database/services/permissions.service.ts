import {Injectable} from '@nestjs/common';
import {DeleteResult, InsertResult, Repository, UpdateResult} from 'typeorm';
import {PermissionEntity} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class PermissionsService {

    constructor(
        @InjectRepository(PermissionEntity)
        private permissionsRepository: Repository<PermissionEntity>
    ) {}

    findAll(): Promise<PermissionEntity[]> {
        return this.permissionsRepository.find();
    }

    findOne(name: string): Promise<PermissionEntity> {
        return this.permissionsRepository.findOne({ name: name });
    }

    insert(permission: PermissionEntity): Promise<InsertResult> {
        return this.permissionsRepository.insert(permission);
    }

    update(name: string, permission: PermissionEntity): Promise<UpdateResult> {
        return this.permissionsRepository.update({ name: name }, permission);
    }

    remove(name: string): Promise<DeleteResult> {
        return this.permissionsRepository.delete({ name: name });
    }

}
