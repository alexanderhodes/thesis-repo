import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {ObjectEntity, ObjectService, ObjectStructureService} from '../../database';
import {IObjectStructure, IUpdateObjectStructureResponse} from '../../shared';
import {ObjectStructureDto, UpdateObjectStructuresDto} from '../dtos';
import {toObjectEntity, toObjectStructureEntity} from '../mappers';
import {HasPermissions, JwtAuthGuard, PermissionsEnum, PermissionsGuard} from '../../authorization';

@ApiTags('object-structure')
@Controller('object-structure')
export class ObjectStructureController {

    constructor(private objectStructureService: ObjectStructureService,
                private objectService: ObjectService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({
        type: [ObjectStructureDto]
    })
    @ApiBearerAuth()
    async getAllObjectStructures(): Promise<ObjectStructureDto[]> {
        const objectStructures = await this.objectStructureService.findAll();
        return objectStructures as IObjectStructure[];
    }

    @UseGuards(JwtAuthGuard)
    @Get("object/:objectName")
    @ApiOkResponse({
        type: [ObjectStructureDto]
    })
    @ApiBearerAuth()
    async getObjectStructureForObject(@Param("objectName") objectName: string): Promise<ObjectStructureDto[]> {
        const object = await this.objectService.findOne(objectName);
        if (object) {
            return this.objectStructureService.findAllByObject(objectName);
        }
        throw new HttpException(`Das Objekt mit dem Namen ${objectName} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @ApiOkResponse({
        type: ObjectStructureDto
    })
    @ApiBearerAuth()
    async getObjectStructureById(@Param("id") id: string): Promise<ObjectStructureDto> {
        const objectStructure = await this.objectStructureService.findOne(id);
        if (objectStructure) {
            return objectStructure;
        }
        throw new HttpException(`Die Objekt-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    @HasPermissions(PermissionsEnum.CONFIGURATION_CREATE)
    @ApiOkResponse({
        type: [ObjectStructureDto]
    })
    @ApiBearerAuth()
    async createObjectStructures(@Body() objectStructureDtos: ObjectStructureDto[]): Promise<ObjectStructureDto[]> {
        const createdObjectStructures: IObjectStructure[] = [];
        for (const createObjectStructure of objectStructureDtos) {
            const object = toObjectEntity(createObjectStructure.object.name, createObjectStructure.object.deletable);
            const objectStructure = toObjectStructureEntity(
                object, new Date(), createObjectStructure.datatype, createObjectStructure.deletable,
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
    @ApiOkResponse({
        type: ObjectStructureDto
    })
    @ApiBearerAuth()
    async updateObjectStructure(@Param("id") id: string, @Body() objectStructureDto: ObjectStructureDto): Promise<IObjectStructure> {
        const foundObjectStructure = await this.objectStructureService.findOne(id);
        if (foundObjectStructure) {
            const object = toObjectEntity(objectStructureDto.object.name, objectStructureDto.object.deletable);
            const objectStructureEntity = toObjectStructureEntity(
                object, foundObjectStructure.createTimestamp,
                objectStructureDto.datatype, objectStructureDto.deletable,
                objectStructureDto.field, objectStructureDto.nullable,
                objectStructureDto.schema, new Date()
            );
            return await this.objectStructureService.update(objectStructureEntity);
        }
        throw new HttpException(`Die Objekt-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Put()
    @HasPermissions(PermissionsEnum.CONFIGURATION_UPDATE)
    @ApiBearerAuth()
    async updateMultipleObjectStructures(@Body() updateObjectStructuresDto: UpdateObjectStructuresDto[]): Promise<IUpdateObjectStructureResponse[]> {
        const updateStructureResponse: IUpdateObjectStructureResponse[] = [];
        for (const obj of updateObjectStructuresDto) {
            const object = toObjectEntity(obj.objectStructure.object.name, obj.objectStructure.object.deletable);

            if (obj.type === 'CREATE') {
                // create object
                const response = await this._createObjectStructure(obj.objectStructure, object);
                updateStructureResponse.push(response);
            } else if (obj.type === 'UPDATE') {
                // update object
                const response = await this._updateObjectStructure(obj.objectStructure, object);
                updateStructureResponse.push(response);
            } else {
                // delete object
                const response = await this._deleteObjectStructure(obj.objectStructure);
                updateStructureResponse.push(response);
            }
        }

        return updateStructureResponse;
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete("multiple/")
    @HasPermissions(PermissionsEnum.CONFIGURATION_DELETE)
    @ApiBearerAuth()
    async deleteObjectStructures(@Query("objectStructures") ids: string[]): Promise<any> {
        if (ids) {
            const results = [];
            for (const id of ids) {
                if (id) {
                    const result = await this.objectStructureService.remove(id);

                    results.push({
                        id: id,
                        success: result && result.affected
                    });
                }
            }
            return results;
        }
        throw new HttpException(`Es wurden keine IDs zur Löschung angegeben.`, HttpStatus.BAD_REQUEST);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete(":id")
    @HasPermissions(PermissionsEnum.CONFIGURATION_DELETE)
    @ApiBearerAuth()
    async deleteObjectStructure(@Param("id") id: string): Promise<any> {
        const result = await this.objectStructureService.remove(id);
        if (result && result.affected) {
            return {};
        }
        throw new HttpException(`Die Objekt-Struktur mit der ID ${id} wurde nicht nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    private async _createObjectStructure(objectStructure: ObjectStructureDto, object: ObjectEntity): Promise<IUpdateObjectStructureResponse> {
        const objectStructureEntity = toObjectStructureEntity(
            object, new Date(),
            objectStructure.datatype, objectStructure.deletable,
            objectStructure.field, objectStructure.nullable,
            objectStructure.schema, new Date());
        const createdObjectStructureEntity = await this.objectStructureService.insert(objectStructureEntity);
        return {
            message: 'CREATED',
            objectStructure: createdObjectStructureEntity,
            response: 'SUCCESS'
        };
    }

    private async _updateObjectStructure(objectStructure: ObjectStructureDto, object: ObjectEntity): Promise<IUpdateObjectStructureResponse> {
        const foundObjectStructure = await this.objectStructureService.findOne(objectStructure.id);
        if (foundObjectStructure) {
            const objectStructureEntity = toObjectStructureEntity(
                object, foundObjectStructure.createTimestamp,
                objectStructure.datatype, objectStructure.deletable,
                objectStructure.field, objectStructure.nullable,
                objectStructure.schema, new Date(), objectStructure.id
            );
            const updatedObjectStructure = await this.objectStructureService.update(objectStructureEntity);
            return {
                message: `UPDATED ${objectStructure.id}`,
                objectStructure: updatedObjectStructure,
                response: 'SUCCESS'
            };
        } else {
            return {
                message: `UPDATE FAILED ${objectStructure.id}`,
                objectStructure: null,
                response: 'ERROR'
            };
        }
    }

    private async _deleteObjectStructure(objectStructure: ObjectStructureDto): Promise<IUpdateObjectStructureResponse> {
        if (objectStructure.id) {
            const result = await this.objectStructureService.remove(objectStructure.id);
            console.log('result', result);
            if (result) {
                return {
                    message: `DELETED ${objectStructure.id}`,
                    objectStructure: null,
                    response: 'SUCCESS'
                };
            } else {
                return {
                    message: `DELETE FAILED ${objectStructure.id}`,
                    objectStructure: null,
                    response: 'ERROR'
                };
            }
        }
    }

}
