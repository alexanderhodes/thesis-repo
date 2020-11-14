import {Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {User} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find({ relations: ["permissions"] });
    }

    findOneById(id: string): Promise<User> {
        return this.usersRepository.findOne({ where: [{"id": id} ], cache: true });
    }

    findOneByUsername(username: string): Promise<User> {
        // return getConnection()
        //     .getRepository(User)
        //     .createQueryBuilder("user")
        //     .where("user.username = :username", { username: username })
        //     .leftJoinAndSelect("user.permissions", "permission")
        //     .getOne();
        return this.usersRepository.findOne({ where: [{ username: username }], relations: ["permissions"] });
    }

    insert(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    update(id: string, user: User): Promise<UpdateResult> {
        return this.usersRepository.update({ id: id }, user);
    }

    remove(id: string): Promise<DeleteResult> {
        return this.usersRepository.delete({ id: id });
    }

}
