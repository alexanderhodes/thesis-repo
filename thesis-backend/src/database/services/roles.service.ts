import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RoleEntity} from '../entities';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(RoleEntity)
        private rolesRepository: Repository<RoleEntity>
    ) {}

    findAll(): Promise<RoleEntity[]> {
        return this.rolesRepository.find({ relations: ["permissions"] });
    }

    findOneByName(name: string): Promise<RoleEntity> {
        return this.rolesRepository.findOne({ where: [{"name": name}], cache: true, relations: ["permissions"] });
    }

    insert(role: RoleEntity): Promise<RoleEntity> {
        return this.rolesRepository.save(role);
    }

    update(name: string, role: RoleEntity): Promise<UpdateResult> {
        return this.rolesRepository.update({ name: name }, role);
    }

    remove(name: string): Promise<DeleteResult> {
        return this.rolesRepository.delete({ name: name });
    }

}
