import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {AssetService, AssetStructureService} from '../../database/services';
import {DbAssetStructure} from '../../shared/interfaces';
import {DBAssetStructureDTO} from '../dtos';
import {toAssetStructureEntity} from '../mappers/db-asset-structure.mapper';
import {toAssetEntity} from '../mappers';

@Controller('configuration/asset-structure')
export class DbAssetStructureController {

    constructor(private assetStructureService: AssetStructureService,
                private assetService: AssetService) {}

    @Get()
    async getAllAssetStructures(): Promise<DbAssetStructure[]> {
        const assetStructures = await this.assetStructureService.findAll();
        return assetStructures as DbAssetStructure[];
    }

    @Get("asset/:assetName")
    async getAssetStructureForAsset(@Param("assetName") assetName: string): Promise<DbAssetStructure[]> {
        const asset = await this.assetService.findOne(assetName);
        if (asset) {
            return this.assetStructureService.findAllByAsset(assetName);
        }
        throw new HttpException(`Das Asset mit dem Namen ${assetName} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @Get(":id")
    async getAssetStructureById(@Param("id") id: string): Promise<DbAssetStructure> {
        const assetStructure = await this.assetStructureService.findOne(id);
        if (assetStructure) {

        }
        throw new HttpException(`Die Asset-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @Post()
    async createAssetStructures(@Body() assetStructuresDTO: DBAssetStructureDTO[]): Promise<DbAssetStructure[]> {
        const createdAssetStructures: DbAssetStructure[] = [];
        for (const createAssetStructure of assetStructuresDTO) {
            const asset = toAssetEntity(createAssetStructure.asset.name, createAssetStructure.asset.deletable, []);
            const assetStructure = toAssetStructureEntity(
                null,  asset, new Date(), createAssetStructure.datatype, createAssetStructure.deletable,
                createAssetStructure.field, createAssetStructure.nullable, createAssetStructure.schema,
                new Date()
            );
            const createdAssetStructure = await this.assetStructureService.insert(assetStructure);
            createdAssetStructures.push(createdAssetStructure);
        }
        return createdAssetStructures;
    }

    @Put(":id")
    async updateAssetStructure(@Param("id") id: string, @Body() assetStructureDTO: DBAssetStructureDTO): Promise<DbAssetStructure> {
        const foundAssetStructure = await this.assetStructureService.findOne(id);
        if (foundAssetStructure) {
            const asset = toAssetEntity(assetStructureDTO.asset.name, assetStructureDTO.asset.deletable, []);
            const assetStructureEntity = toAssetStructureEntity(
                id, asset, foundAssetStructure.createTimestamp,
                assetStructureDTO.datatype, assetStructureDTO.deletable,
                assetStructureDTO.field, assetStructureDTO.nullable,
                assetStructureDTO.schema, new Date()
            );
            return await this.assetStructureService.update(assetStructureEntity);
        }
        throw new HttpException(`Die Asset-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @Delete(":id")
    async deleteAssetStructure(@Param("id") id: string): Promise<any> {
        const result = await this.assetStructureService.remove(id);
        if (result && result.affected) {
            return {};
        }
        throw new HttpException(`Die Asset-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

}
