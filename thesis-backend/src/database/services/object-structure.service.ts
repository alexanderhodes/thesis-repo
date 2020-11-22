import {Injectable} from '@nestjs/common';
import {DeleteResult, getConnection, Repository} from 'typeorm';
import {ObjectStructureEntity} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ObjectStructureService {

    constructor(
        @InjectRepository(ObjectStructureEntity)
        private objectStructureRepository: Repository<ObjectStructureEntity>
    ) { }

    findAll(): Promise<ObjectStructureEntity[]> {
        return this.objectStructureRepository.find();
    }

    findOne(id: string): Promise<ObjectStructureEntity> {
        return getConnection()
            .getRepository(ObjectStructureEntity)
            .createQueryBuilder("object-structure")
            .where("object-structure.id = :id", { id: id })
            .leftJoinAndSelect("object-structure.assetName", "object")
            .getOne();
    }

    findAllByObject(objectName: string): Promise<ObjectStructureEntity[]> {
        return getConnection()
            .getRepository(ObjectStructureEntity)
            .createQueryBuilder("object-structure")
            .where("object-structure.object = :objectName", { objectName: objectName })
            .leftJoinAndSelect("object-structure.object", "object")
            .getMany();
    }

    insert(objectStructure: ObjectStructureEntity): Promise<ObjectStructureEntity> {
        return this.objectStructureRepository.save(objectStructure);
    }

    update(objectStructure: ObjectStructureEntity): Promise<ObjectStructureEntity> {
        return this.objectStructureRepository.save(objectStructure);
    }

    remove(id: string): Promise<DeleteResult> {
        return this.objectStructureRepository.delete({ id: id });
    }

}
