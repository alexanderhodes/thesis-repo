import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ObjectService} from '../../database/services';
import {ObjectDto} from '../dtos';
import {toObjectEntity} from '../mappers';
import {IObject} from '../../shared/interfaces';
import {JwtAuthGuard, PermissionsGuard} from '../../authorization/guards';
import {HasPermissions} from '../../authorization/decorators';
import {PermissionsEnum} from '../../authorization/constants';

@Controller('objects')
export class ObjectController {

    constructor(private objectService: ObjectService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    @HasPermissions(PermissionsEnum.CONFIGURATION_CREATE)
    async createObject(@Body() createObject: ObjectDto): Promise<IObject> {
        const foundObject = await this.objectService.findOne(createObject.name);
        if (!foundObject) {
            const objectEntity = toObjectEntity(createObject.name, createObject.deletable, []);
            const createdObjectEntity = await this.objectService.insert(objectEntity);

            return {
                name: createdObjectEntity.name,
                deletable: createdObjectEntity.deletable,
                assetStructure: []
            };
        }
        throw new HttpException({
            message: `Objekt mit dem Namen ${createObject.name} existiert bereits`
        }, HttpStatus.CONFLICT);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllObjects(): Promise<IObject[]> {
        return this.objectService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":name")
    async getObjectByName(@Param("name") name: string): Promise<IObject> {
        const object = await this.objectService.findOne(name);
        if (object) {
            return object;
        }
        throw new HttpException(`Das Objekt mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Put(":name")
    @HasPermissions(PermissionsEnum.CONFIGURATION_UPDATE)
    async updateObject(@Param("name") name: string, @Body() updateObjectDto: ObjectDto): Promise<IObject> {
        const foundObject = await this.objectService.findOne(name);
        if (foundObject) {
            const object = toObjectEntity(updateObjectDto.name, updateObjectDto.deletable, []);
            return await this.objectService.update(object);
        }
        throw new HttpException(`Das Objekt mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete(":name")
    @HasPermissions(PermissionsEnum.CONFIGURATION_DELETE)
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
