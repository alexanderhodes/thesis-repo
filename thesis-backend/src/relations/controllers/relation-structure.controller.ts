import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {RelationEntity, RelationService, RelationStructureService} from '../../database';
import {HasPermissions, JwtAuthGuard, PermissionsEnum, PermissionsGuard} from '../../authorization';
import {IDbRelationStructure, IUpdateRelationStructureResponse} from '../../shared';
import {DbRelationDto, DbRelationStructureDto, UpdateRelationStructuresDto} from '../dtos';
import {toRelationEntity, toRelationStructureEntity} from '../mappers';

@ApiTags('relation-structure')
@Controller('relation-structure')
export class RelationStructureController {

    constructor(private relationStructureService: RelationStructureService,
                private relationService: RelationService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({
        type: [DbRelationStructureDto]
    })
    @ApiBearerAuth()
    async getAllRelationStructures(): Promise<DbRelationStructureDto[]> {
        const relationStructures = await this.relationStructureService.findAll();
        return relationStructures as IDbRelationStructure[];
    }

    @UseGuards(JwtAuthGuard)
    @Get("relation/:relationName")
    @ApiOkResponse({
        type: [DbRelationStructureDto]
    })
    @ApiBearerAuth()
    async getRelationStructureForRelation(@Param("relationName") relationName: string): Promise<DbRelationStructureDto[]> {
        const relation = await this.relationService.findOne(relationName);
        if (relation) {
            return this.relationStructureService.findAllByRelation(relationName);
        }
        throw new HttpException(`Die Beziehung mit dem Namen ${relationName} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @ApiOkResponse({
        type: DbRelationStructureDto
    })
    @ApiBearerAuth()
    async getRelationStructure(@Param("id") id: string): Promise<DbRelationStructureDto> {
        const relationStructure = await this.relationStructureService.findOne(id);
        if (relationStructure) {
            return relationStructure;
        }
        throw new HttpException(`Die Beziehungs-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    @HasPermissions(PermissionsEnum.CONFIGURATION_CREATE)
    @ApiOkResponse({
        type: [DbRelationStructureDto]
    })
    @ApiBearerAuth()
    async createRelationStructures(@Body() relationStructureDtos: DbRelationStructureDto[]): Promise<DbRelationStructureDto[]> {
        const createdRelationStructures: IDbRelationStructure[] = [];
        for (const createRelationStructure of relationStructureDtos) {
            const relation = toRelationEntity(createRelationStructure.relation.name);
            const relationStructure = toRelationStructureEntity(relation, createRelationStructure.field, new Date(), new Date());
            const createdRelationStructure = await this.relationStructureService.insert(relationStructure);
            createdRelationStructures.push(createdRelationStructure);
        }
        return createdRelationStructures;
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Put(":id")
    @HasPermissions(PermissionsEnum.CONFIGURATION_UPDATE)
    @ApiOkResponse({
        type: DbRelationStructureDto
    })
    @ApiBearerAuth()
    async updateRelationStructure(@Param("id") id: string, @Body() relationStructureDto: DbRelationStructureDto): Promise<DbRelationStructureDto> {
        const foundRelationStructure = await this.relationStructureService.findOne(id);
        if (foundRelationStructure) {
            const relation = toRelationEntity(relationStructureDto.relation.name);
            const relationStructure = toRelationStructureEntity(relation, relationStructureDto.field, foundRelationStructure.createTimestamp, new Date());
            return await this.relationStructureService.update(relationStructure);
        }
        throw new HttpException(`Die Beziehungs-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Put()
    @HasPermissions(PermissionsEnum.CONFIGURATION_UPDATE)
    @ApiBearerAuth()
    async updateMultipleRelationStructures(@Body() updateRelationStructureDtos: UpdateRelationStructuresDto[]): Promise<IUpdateRelationStructureResponse[]> {
        const updateRelationStructureResponse: IUpdateRelationStructureResponse[] = [];
        for (const rel of updateRelationStructureDtos) {
            const relation = toRelationEntity(rel.relationStructure.relation.name);

            if (rel.type === 'CREATE') {
                // create object
                const response = await this._createRelationStructure(rel.relationStructure, relation);
                updateRelationStructureResponse.push(response);
            } else if (rel.type === 'UPDATE') {
                // update object
                const response = await this._updateRelationStructure(rel.relationStructure, relation);
                updateRelationStructureResponse.push(response);
            } else {
                // delete object
                const response = await this._deleteRelationStructure(rel.relationStructure);
                updateRelationStructureResponse.push(response);
            }
        }

        return updateRelationStructureResponse;
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete(":id")
    @HasPermissions(PermissionsEnum.CONFIGURATION_DELETE)
    @ApiBearerAuth()
    async deleteObjectStructure(@Param("id") id: string): Promise<any> {
        const result = await this.relationStructureService.remove(id);
        if (result && result.affected) {
            return {};
        }
        throw new HttpException(`Die Beziehungs-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    private async _createRelationStructure(relationStructure: DbRelationStructureDto, relation: RelationEntity): Promise<IUpdateRelationStructureResponse> {
        const relationStructureEntity = toRelationStructureEntity(
            relation, relationStructure.field, new Date(),
            new Date(), relationStructure.id)
        const createdRelationStructure = await this.relationStructureService.insert(relationStructureEntity);
        return {
            message: 'CREATED',
            relationStructure: createdRelationStructure,
            response: 'SUCCESS'
        };
    }

    private async _updateRelationStructure(relationStructure: DbRelationStructureDto, relation: RelationEntity): Promise<IUpdateRelationStructureResponse> {
        const foundRelationStructure = await this.relationStructureService.findOne(relationStructure.id);
        if (foundRelationStructure) {
            const relationStructureEntity = toRelationStructureEntity(
                relation, relationStructure.field, foundRelationStructure.createTimestamp,
                new Date(), relationStructure.id)

            const updateRelationStructure = await this.relationStructureService.update(relationStructureEntity);
            return {
                message: `UPDATED ${relationStructure.id}`,
                relationStructure: updateRelationStructure,
                response: 'SUCCESS'
            };
        } else {
            return {
                message: `UPDATE FAILED ${relationStructure.id}`,
                relationStructure: null,
                response: 'ERROR'
            };
        }
    }

    private async _deleteRelationStructure(relationStructure: DbRelationStructureDto): Promise<IUpdateRelationStructureResponse> {
        if (relationStructure.id) {
            const result = await this.relationStructureService.remove(relationStructure.id);
            console.log('result', result);
            if (result) {
                return {
                    message: `DELETED ${relationStructure.id}`,
                    relationStructure: null,
                    response: 'SUCCESS'
                };
            } else {
                return {
                    message: `DELETE FAILED ${relationStructure.id}`,
                    relationStructure: null,
                    response: 'ERROR'
                };
            }
        }
    }

}
