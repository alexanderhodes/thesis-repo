import {Injectable} from '@nestjs/common';
import {DeleteResult, getConnection, Repository} from 'typeorm';
import {AssetStructureEntity} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class AssetStructureService {

    constructor(
        @InjectRepository(AssetStructureEntity)
        private assetStructureRepository: Repository<AssetStructureEntity>
    ) { }

    findAll(): Promise<AssetStructureEntity[]> {
        return this.assetStructureRepository.find();
    }

    findOne(id: string): Promise<AssetStructureEntity> {
        return getConnection()
            .getRepository(AssetStructureEntity)
            .createQueryBuilder("asset-structure")
            .where("asset-structure.id = :id", { id: id })
            .leftJoinAndSelect("asset-structure.assetName", "asset")
            .getOne();
    }

    findAllByAsset(assetName: string): Promise<AssetStructureEntity[]> {
        return getConnection()
            .getRepository(AssetStructureEntity)
            .createQueryBuilder("asset-structure")
            .where("asset-structure.asset = :assetName", { assetName: assetName })
            .leftJoinAndSelect("asset-structure.asset", "asset")
            .getMany();
    }

    insert(assetStructure: AssetStructureEntity): Promise<AssetStructureEntity> {
        return this.assetStructureRepository.save(assetStructure);
    }

    update(assetStructure: AssetStructureEntity): Promise<AssetStructureEntity> {
        return this.assetStructureRepository.save(assetStructure);
    }

    remove(id: string): Promise<DeleteResult> {
        return this.assetStructureRepository.delete({ id: id });
    }

}
