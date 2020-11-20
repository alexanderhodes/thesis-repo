import {Injectable} from '@nestjs/common';
import {DeleteResult, getConnection, Repository, UpdateResult} from 'typeorm';
import {UserEntity} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find({ relations: ["roles"] });
    }

    findOneById(id: string): Promise<UserEntity> {
        return getConnection()
            .getRepository(UserEntity)
            .createQueryBuilder("user")
            .where("user.id = :id", { id: id })
            .leftJoinAndSelect("user.roles", "roles")
            .leftJoinAndSelect("roles.permissions", "permissions")
            .getOne();
//        return this.usersRepository.findOne({ where: [{"id": id} ], cache: true, relations: ["roles"] });
    }

    findOneByUsername(username: string): Promise<UserEntity> {
        return getConnection()
            .getRepository(UserEntity)
            .createQueryBuilder("user")
            .where("user.username = :username", { username: username })
            .leftJoinAndSelect("user.roles", "roles")
            .leftJoinAndSelect("roles.permissions", "permissions")
            .getOne();
//        return this.usersRepository.findOne({ where: [{ username: username }], relations: ["roles"] });
    }

    insert(user: UserEntity): Promise<UserEntity> {
        return this.usersRepository.save(user);
    }

    update(id: string, user: UserEntity): Promise<UserEntity> {
//        return this.usersRepository.update(`id = ${id}`, user);
        return this.usersRepository.save(user);
    }

    remove(id: string): Promise<DeleteResult> {
        return this.usersRepository.delete({ id: id });
    }

}
