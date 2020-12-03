import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RelationService, RelationStructureService} from '../../database/services';
import {JwtAuthGuard, PermissionsGuard} from '../../authorization/guards';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {IDbRelationStructure} from '../../shared/interfaces';
import {HasPermissions} from '../../authorization/decorators';
import {PermissionsEnum} from '../../authorization/constants';
import {DbRelationStructureDto} from '../dtos';
import {toRelationEntity, toRelationStructureEntity} from '../mappers';

@ApiTags('relation-structure')
@Controller('relation-structure')
export class RelationStructureController {

    constructor(private relationStructureService: RelationStructureService,
                private relationService: RelationService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiBearerAuth()
    async getAllRelationStructures(): Promise<IDbRelationStructure[]> {
        const relationStructures = await this.relationStructureService.findAll();
        return relationStructures as IDbRelationStructure[];
    }

    @UseGuards(JwtAuthGuard)
    @Get("relation/:relationName")
    @ApiBearerAuth()
    async getRelationStructureForRelation(@Param("relationName") relationName: string): Promise<IDbRelationStructure[]> {
        const relation = await this.relationService.findOne(relationName);
        if (relation) {
            return this.relationStructureService.findAllByRelation(relationName);
        }
        throw new HttpException(`Die Beziehung mit dem Namen ${relationName} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @ApiBearerAuth()
    async getRelationStructure(@Param("id") id: string): Promise<IDbRelationStructure> {
        const relationStructure = await this.relationStructureService.findOne(id);
        if (relationStructure) {
            return relationStructure;
        }
        throw new HttpException(`Die Beziehungs-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    @HasPermissions(PermissionsEnum.CONFIGURATION_CREATE)
    @ApiBearerAuth()
    async createRelationStructures(@Body() relationStructureDtos: DbRelationStructureDto[]): Promise<IDbRelationStructure[]> {
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
    @ApiBearerAuth()
    async updateRelationStructure(@Param("id") id: string, @Body() relationStructureDto: DbRelationStructureDto): Promise<IDbRelationStructure> {
        const foundRelationStructure = await this.relationStructureService.findOne(id);
        if (foundRelationStructure) {
            const relation = toRelationEntity(relationStructureDto.relation.name);
            const relationStructure = toRelationStructureEntity(relation, relationStructureDto.field, foundRelationStructure.createTimestamp, new Date());
            return await this.relationStructureService.update(relationStructure);
        }
        throw new HttpException(`Die Beziehungs-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
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

}
