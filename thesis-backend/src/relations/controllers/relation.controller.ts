import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {RelationService} from '../../database';
import {HasPermissions, JwtAuthGuard, PermissionsEnum, PermissionsGuard} from '../../authorization';
import {DbRelationDto} from '../dtos';
import {toRelationEntity} from '../mappers';

@ApiTags('relations')
@Controller('relations')
export class RelationController {

    constructor(private relationService: RelationService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    @HasPermissions(PermissionsEnum.CONFIGURATION_CREATE)
    @ApiOkResponse({
        type: DbRelationDto
    })
    @ApiBearerAuth()
    async createRelation(@Body() createRelation: DbRelationDto): Promise<DbRelationDto> {
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
    @ApiOkResponse({
        type: [DbRelationDto]
    })
    @ApiBearerAuth()
    getAllRelations(): Promise<DbRelationDto[]> {
        return this.relationService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":name")
    @ApiOkResponse({
        type: DbRelationDto
    })
    @ApiBearerAuth()
    async getRelationByName(@Param("name") name: string): Promise<DbRelationDto> {
        const relation = await this.relationService.findOne(name);
        if (relation) {
            return relation;
        }
        throw new HttpException(`Die Beziehung mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Put(":name")
    @HasPermissions(PermissionsEnum.CONFIGURATION_UPDATE)
    @ApiOkResponse({
        type: DbRelationDto
    })
    @ApiBearerAuth()
    async updateRelation(@Param("name") name: string, @Body() updateRelationDto: DbRelationDto): Promise<DbRelationDto> {
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
