import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RelationService} from '../../database/services';
import {JwtAuthGuard, PermissionsGuard} from '../../authorization/guards';
import {HasPermissions} from '../../authorization/decorators';
import {PermissionsEnum} from '../../authorization/constants';
import {ApiBearerAuth} from '@nestjs/swagger';
import {DbRelationDto, ObjectDto, RelationDto} from '../dtos';
import {IDbRelation, IObject} from '../../shared/interfaces';
import {toObjectEntity, toRelationEntity} from '../mappers';

@Controller('relations')
@Controller('relations')
export class RelationController {

    constructor(private relationService: RelationService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    @HasPermissions(PermissionsEnum.CONFIGURATION_CREATE)
    @ApiBearerAuth()
    async createRelation(@Body() createRelation: DbRelationDto): Promise<IDbRelation> {
        const foundRelation = await this.relationService.findOne(createRelation.name);
        if (!foundRelation) {
            const relationEntity = toRelationEntity(createRelation.name);
            const createdRelationEntity = await this.relationService.insert(relationEntity);

            return {
                name: createdRelationEntity.name,
            };
        }
        throw new HttpException({
            message: `Die Beziehung mit dem Namen ${createRelation.name} existiert bereits`
        }, HttpStatus.CONFLICT);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiBearerAuth()
    getAllRelations(): Promise<IDbRelation[]> {
        return this.relationService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":name")
    @ApiBearerAuth()
    async getRelationByName(@Param("name") name: string): Promise<IDbRelation> {
        const relation = await this.relationService.findOne(name);
        if (relation) {
            return relation;
        }
        throw new HttpException(`Die Beziehung mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Put(":name")
    @HasPermissions(PermissionsEnum.CONFIGURATION_UPDATE)
    @ApiBearerAuth()
    async updateRelation(@Param("name") name: string, @Body() updateRelationDto: DbRelationDto): Promise<IDbRelation> {
        const foundRelation = await this.relationService.findOne(name);
        if (foundRelation) {
            const relation = toRelationEntity(updateRelationDto.name);
            return await this.relationService.update(relation);
        }
        throw new HttpException(`Die Beziehung mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete(":name")
    @HasPermissions(PermissionsEnum.CONFIGURATION_DELETE)
    @ApiBearerAuth()
    async deleteRelation(@Param("name") name: string): Promise<any> {
        const result = await this.relationService.remove(name);
        if (result) {
            if (result.affected === 0) {
                throw new HttpException(`Die Beziehung mit dem Namen ${name} kann nicht gelöscht werden.`, HttpStatus.BAD_REQUEST);
            } else {
                return {};
            }
        }
        throw new HttpException(`Die Beziehung mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }


}
