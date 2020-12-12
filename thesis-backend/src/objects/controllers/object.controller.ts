import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {ObjectService} from '../../database';
import {ObjectDto} from '../dtos';
import {toObjectEntity} from '../mappers';
import {IObject} from '../../shared';
import {HasPermissions, JwtAuthGuard, PermissionsEnum, PermissionsGuard} from '../../authorization';

@ApiTags('objects')
@Controller('objects')
export class ObjectController {

    constructor(private objectService: ObjectService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    @HasPermissions(PermissionsEnum.CONFIGURATION_CREATE)
    @ApiOkResponse({
        type: ObjectDto
    })
    @ApiBearerAuth()
    async createObject(@Body() createObject: ObjectDto): Promise<ObjectDto> {
        const foundObject = await this.objectService.findOne(createObject.name);
        if (!foundObject) {
            const objectEntity = toObjectEntity(createObject.name, createObject.deletable);
            const createdObjectEntity = await this.objectService.insert(objectEntity);

            return {
                name: createdObjectEntity.name,
                deletable: createdObjectEntity.deletable
            };
        }
        throw new HttpException({
            message: `Objekt mit dem Namen ${createObject.name} existiert bereits`
        }, HttpStatus.CONFLICT);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Get()
    @HasPermissions(PermissionsEnum.ASSETS_READ)
    @ApiOkResponse({
        type: [ObjectDto]
    })
    @ApiBearerAuth()
    getAllObjects(): Promise<ObjectDto[]> {
        return this.objectService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":name")
    @ApiOkResponse({
        type: ObjectDto
    })
    @ApiBearerAuth()
    async getObjectByName(@Param("name") name: string): Promise<ObjectDto> {
        const object = await this.objectService.findOne(name);
        if (object) {
            return object;
        }
        throw new HttpException(`Das Objekt mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Put(":name")
    @HasPermissions(PermissionsEnum.CONFIGURATION_UPDATE)
    @ApiOkResponse({
        type: ObjectDto
    })
    @ApiBearerAuth()
    async updateObject(@Param("name") name: string, @Body() updateObjectDto: ObjectDto): Promise<ObjectDto> {
        const foundObject = await this.objectService.findOne(name);
        if (foundObject) {
            const object = toObjectEntity(updateObjectDto.name, updateObjectDto.deletable);
            return await this.objectService.update(object);
        }
        throw new HttpException(`Das Objekt mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete(":name")
    @HasPermissions(PermissionsEnum.CONFIGURATION_DELETE)
    @ApiBearerAuth()
    async deleteObject(@Param("name") name: string): Promise<any> {
        const result = await this.objectService.remove(name);
        if (result) {
            if (result.affected === 0) {
                throw new HttpException(`Das Objekt mit dem Namen ${name} kann nicht gelöscht werden.`, HttpStatus.BAD_REQUEST);
            } else {
                return {};
            }
        }
        throw new HttpException(`Das Objekt mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

}
