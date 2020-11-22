import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {AssetService, AssetStructureService} from '../../database/services';
import {DBAssetDTO} from '../dtos';
import {toAssetEntity} from '../mappers';
import {toAssetStructureEntity} from '../mappers/db-asset-structure.mapper';
import {DbAsset} from '../../shared/interfaces';

@Controller('configuration/assets')
export class DbAssetController {

    constructor(private assetService: AssetService,
                private assetStructureService: AssetStructureService) {}

    @Post()
    async createAsset(@Body() createAsset: DBAssetDTO): Promise<DbAsset> {
        const foundAsset = await this.assetService.findOne(createAsset.name);
        if (foundAsset) {
            const assetEntity = toAssetEntity(createAsset.name, createAsset.deletable, []);
            const createdAssetEntity = await this.assetService.insert(assetEntity);

//            const assetStructureEntities = [];
//            for (const createAssetStructureEntity of createAsset.assetStructure) {
//                const assetStructureEntity = toAssetStructureEntity(
//                    null,
//                    createdAssetEntity,
//                    new Date(),
//                    createAssetStructureEntity.datatype,
//                    createAssetStructureEntity.deletable,
//                    createAssetStructureEntity.field,
//                    createAssetStructureEntity.nullable,
//                    createAssetStructureEntity.schema,
//                    new Date()
//                );
//                const createdAssetStructureEntity = await this.assetStructureService.insert(assetStructureEntity);
//                assetStructureEntities.push(createdAssetStructureEntity);
//            }

            return {
                name: createdAssetEntity.name,
                deletable: createdAssetEntity.deletable,
                assetStructure: []
            };
        }
        throw new HttpException(`Asset mit dem Namen ${createAsset.name} existiert bereits`, HttpStatus.BAD_GATEWAY);
    }

    @Get()
    getAllAssets(): Promise<DbAsset[]> {
        return this.assetService.findAll();
    }

    @Get(":name")
    async getAssetByName(@Param("name") name: string): Promise<DbAsset> {
        const asset = await this.assetService.findOne(name);
        if (asset) {
            return asset;
        }
        throw new HttpException(`Das Asset mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @Put(":name")
    async updateAsset(@Param("name") name: string, @Body() updateAssetDTO: DBAssetDTO): Promise<DbAsset> {
        const foundAsset = await this.assetService.findOne(name);
        if (foundAsset) {
            const asset = toAssetEntity(updateAssetDTO.name, updateAssetDTO.deletable, []);
            return await this.assetService.update(asset);
        }
        throw new HttpException(`Das Asset mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @Delete()
    async deleteAsset(@Param("name") name: string): Promise<any> {
        const result = await this.assetService.remove(name);
        if (result) {
            if (result.affected === 0) {
                throw new HttpException(`Das Asset mit dem Namen ${name} kann nicht gelöscht werden.`, HttpStatus.BAD_REQUEST);
            } else {
                return {};
            }
        }
        throw new HttpException(`Das Asset mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

}
