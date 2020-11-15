import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Role} from '../entities';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>
    ) {}

    findAll(): Promise<Role[]> {
        return this.rolesRepository.find({ relations: ["permissions"] });
    }

    findOneByName(name: string): Promise<Role> {
        return this.rolesRepository.findOne({ where: [{"name": name}], cache: true, relations: ["permissions"] });
    }

    insert(role: Role): Promise<Role> {
        return this.rolesRepository.save(role);
    }

    update(name: string, role: Role): Promise<UpdateResult> {
        return this.rolesRepository.update({ name: name }, role);
    }

    remove(name: string): Promise<DeleteResult> {
        return this.rolesRepository.delete({ name: name });
    }

}
