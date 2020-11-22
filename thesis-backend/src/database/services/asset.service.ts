import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, getConnection, Repository} from 'typeorm';
import {AssetEntity} from '../entities';

@Injectable()
export class AssetService {

    constructor(
        @InjectRepository(AssetEntity)
        private assetRepository: Repository<AssetEntity>
    ) {}

    findAll(): Promise<AssetEntity[]> {
        return getConnection()
            .getRepository(AssetEntity)
            .createQueryBuilder("asset")
            .leftJoinAndSelect("asset.assetStructure", "asset-structure")
            .getMany();
    }

    findOne(name: string): Promise<AssetEntity> {
        return getConnection()
            .getRepository(AssetEntity)
            .createQueryBuilder("asset")
            .where("asset.name = :name", {name: name})
            .leftJoinAndSelect("asset.assetStructure", "asset-structure")
            .getOne();
    }

    insert(asset: AssetEntity): Promise<AssetEntity> {
        return this.assetRepository.save(asset);
    }

    update(asset: AssetEntity): Promise<AssetEntity> {
        return this.assetRepository.save(asset);
    }

    async remove(name: string): Promise<DeleteResult> {
        const asset = await this.findOne(name);
        if (asset) {
            return asset.deletable ? this.assetRepository.delete({
                name: name
            }): {
                affected: 0,
                raw: {}
            };
        }
        return null;
    }

}
