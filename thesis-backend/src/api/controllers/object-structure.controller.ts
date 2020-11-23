import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ObjectService, ObjectStructureService} from '../../database/services';
import {IObjectStructure} from '../../shared/interfaces';
import {ObjectStructureDto} from '../dtos';
import {toObjectStructureEntity} from '../mappers/object-structure.mapper';
import {toObjectEntity} from '../mappers';
import {JwtAuthGuard, PermissionsGuard} from '../../authorization/guards';
import {HasPermissions} from '../../authorization/decorators';
import {PermissionsEnum} from '../../authorization/constants';

@Controller('object-structure')
export class ObjectStructureController {

    constructor(private objectStructureService: ObjectStructureService,
                private objectService: ObjectService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllObjectStructures(): Promise<IObjectStructure[]> {
        const objectStructures = await this.objectStructureService.findAll();
        return objectStructures as IObjectStructure[];
    }

    @UseGuards(JwtAuthGuard)
    @Get("object/:objectName")
    async getObjectStructureForObject(@Param("objectName") objectName: string): Promise<IObjectStructure[]> {
        const object = await this.objectService.findOne(objectName);
        if (object) {
            return this.objectStructureService.findAllByObject(objectName);
        }
        throw new HttpException(`Das Objekt mit dem Namen ${objectName} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getObjectStructureById(@Param("id") id: string): Promise<IObjectStructure> {
        const objectStructure = await this.objectStructureService.findOne(id);
        if (objectStructure) {
            return objectStructure;
        }
        throw new HttpException(`Die Objekt-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    @HasPermissions(PermissionsEnum.CONFIGURATION_CREATE)
    async createAssetStructures(@Body() objectStructureDtos: ObjectStructureDto[]): Promise<IObjectStructure[]> {
        const createdObjectStructures: IObjectStructure[] = [];
        for (const createObjectStructure of objectStructureDtos) {
            const object = toObjectEntity(createObjectStructure.object.name, createObjectStructure.object.deletable, []);
            const objectStructure = toObjectStructureEntity(
                null,  object, new Date(), createObjectStructure.datatype, createObjectStructure.deletable,
                createObjectStructure.field, createObjectStructure.nullable, createObjectStructure.schema,
                new Date()
            );
            const createdObjectStructureEntity = await this.objectStructureService.insert(objectStructure);
            createdObjectStructures.push(createdObjectStructureEntity);
        }
        return createdObjectStructures;
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Put(":id")
    @HasPermissions(PermissionsEnum.CONFIGURATION_UPDATE)
    async updateObjectStructure(@Param("id") id: string, @Body() objectStructureDto: ObjectStructureDto): Promise<IObjectStructure> {
        const foundObjectStructure = await this.objectStructureService.findOne(id);
        if (foundObjectStructure) {
            const object = toObjectEntity(objectStructureDto.object.name, objectStructureDto.object.deletable, []);
            const objectStructureEntity = toObjectStructureEntity(
                id, object, foundObjectStructure.createTimestamp,
                objectStructureDto.datatype, objectStructureDto.deletable,
                objectStructureDto.field, objectStructureDto.nullable,
                objectStructureDto.schema, new Date()
            );
            return await this.objectStructureService.update(objectStructureEntity);
        }
        throw new HttpException(`Die Objekt-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete(":id")
    @HasPermissions(PermissionsEnum.CONFIGURATION_DELETE)
    async deleteObjectStructure(@Param("id") id: string): Promise<any> {
        const result = await this.objectStructureService.remove(id);
        if (result && result.affected) {
            return {};
        }
        throw new HttpException(`Die Objekt-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

}
