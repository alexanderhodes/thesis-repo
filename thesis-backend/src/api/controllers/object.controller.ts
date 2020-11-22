import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {ObjectService} from '../../database/services';
import {ObjectDto} from '../dtos';
import {toObjectEntity} from '../mappers';
import {IObject} from '../../shared/interfaces';

@Controller('configuration/objects')
export class ObjectController {

    constructor(private objectService: ObjectService) {}

    @Post()
    async createObject(@Body() createObject: ObjectDto): Promise<IObject> {
        const foundObject = await this.objectService.findOne(createObject.name);
        if (foundObject) {
            const objectEntity = toObjectEntity(createObject.name, createObject.deletable, []);
            const createdObjectEntity = await this.objectService.insert(objectEntity);

            return {
                name: createdObjectEntity.name,
                deletable: createdObjectEntity.deletable,
                assetStructure: []
            };
        }
        throw new HttpException(`Objekt mit dem Namen ${createObject.name} existiert bereits`, HttpStatus.BAD_GATEWAY);
    }

    @Get()
    getAllObjects(): Promise<IObject[]> {
        return this.objectService.findAll();
    }

    @Get(":name")
    async getObjectByName(@Param("name") name: string): Promise<IObject> {
        const object = await this.objectService.findOne(name);
        if (object) {
            return object;
        }
        throw new HttpException(`Das Objekt mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @Put(":name")
    async updateObject(@Param("name") name: string, @Body() updateObjectDto: ObjectDto): Promise<IObject> {
        const foundObject = await this.objectService.findOne(name);
        if (foundObject) {
            const object = toObjectEntity(updateObjectDto.name, updateObjectDto.deletable, []);
            return await this.objectService.update(object);
        }
        throw new HttpException(`Das Objekt mit dem Namen ${name} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @Delete()
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
