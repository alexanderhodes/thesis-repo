import {Injectable} from '@nestjs/common';
import {DeleteResult, InsertResult, Repository, UpdateResult} from 'typeorm';
import {Permission, User} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOneById(id: string): Promise<User> {
        return this.usersRepository.findOne({ id: id });
    }

    findOneByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({ username: username });
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
