import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RelationEntity} from '../entities';
import {DeleteResult, getConnection, Repository} from 'typeorm';

@Injectable()
export class RelationService {

    constructor(
        @InjectRepository(RelationEntity)
        private relationRepository: Repository<RelationEntity>
    ) {
    }

    findAll(): Promise<RelationEntity[]> {
        return getConnection()
            .getRepository(RelationEntity)
            .createQueryBuilder("relation")
            .getMany();
    }

    findOne(name: string): Promise<RelationEntity> {
        return getConnection()
            .getRepository(RelationEntity)
            .createQueryBuilder("relation")
            .where("relation.name = :name", {name: name})
            .getOne();
    }

    insert(relation: RelationEntity): Promise<RelationEntity> {
        return this.relationRepository.save(relation);
    }

    update(relation: RelationEntity): Promise<RelationEntity> {
        return this.relationRepository.save(relation);
    }

    async remove(name: string): Promise<DeleteResult> {
        return this.relationRepository.delete({
            name: name
        });
    }
}
