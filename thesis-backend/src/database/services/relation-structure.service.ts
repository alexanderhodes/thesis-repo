import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RelationStructureEntity} from '../entities';
import {DeleteResult, getConnection, Repository} from 'typeorm';

@Injectable()
export class RelationStructureService {

    constructor(
        @InjectRepository(RelationStructureEntity)
        private relationStructureRepository: Repository<RelationStructureEntity>
    ) { }

    findAll(): Promise<RelationStructureEntity[]> {
        return this.relationStructureRepository.find();
    }

    findOne(id: string): Promise<RelationStructureEntity> {
        return getConnection()
            .getRepository(RelationStructureEntity)
            .createQueryBuilder("relation-structure")
            .where("relation-structure.id = :id", { id: id })
            .leftJoinAndSelect("relation-structure.relation", "relation")
            .getOne();
    }

    findAllByRelation(relationName: string): Promise<RelationStructureEntity[]> {
        return getConnection()
            .getRepository(RelationStructureEntity)
            .createQueryBuilder("relation-structure")
            .leftJoinAndSelect("relation-structure.relation", "relation")
            .where("relation.name = :relationName", { relationName: relationName })
            .getMany();
    }

    insert(relationStructure: RelationStructureEntity): Promise<RelationStructureEntity> {
        return this.relationStructureRepository.save(relationStructure);
    }

    update(relationStructure: RelationStructureEntity): Promise<RelationStructureEntity> {
        return this.relationStructureRepository.save(relationStructure);
    }

    remove(id: string): Promise<DeleteResult> {
        return this.relationStructureRepository.delete({ id: id });
    }

}
