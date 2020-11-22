import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, getConnection, Repository} from 'typeorm';
import {ObjectEntity} from '../entities';

@Injectable()
export class ObjectService {

    constructor(
        @InjectRepository(ObjectEntity)
        private objectRepository: Repository<ObjectEntity>
    ) {}

    findAll(): Promise<ObjectEntity[]> {
        return getConnection()
            .getRepository(ObjectEntity)
            .createQueryBuilder("object")
            .leftJoinAndSelect("object.objectStructure", "object-structure")
            .getMany();
    }

    findOne(name: string): Promise<ObjectEntity> {
        return getConnection()
            .getRepository(ObjectEntity)
            .createQueryBuilder("object")
            .where("object.name = :name", {name: name})
            .leftJoinAndSelect("object.objectStructure", "object-structure")
            .getOne();
    }

    insert(object: ObjectEntity): Promise<ObjectEntity> {
        return this.objectRepository.save(object);
    }

    update(object: ObjectEntity): Promise<ObjectEntity> {
        return this.objectRepository.save(object);
    }

    async remove(name: string): Promise<DeleteResult> {
        const object = await this.findOne(name);
        if (object) {
            return object.deletable ? this.objectRepository.delete({
                name: name
            }): {
                affected: 0,
                raw: {}
            };
        }
        return null;
    }

}
