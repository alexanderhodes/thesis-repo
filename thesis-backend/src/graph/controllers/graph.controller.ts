import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {GraphService} from '../services';
import {IGraphObject, IGraphRelationsResponse, IRemoteResponse} from '../../shared';
import {GraphQueryDto, GraphRelationDto} from '../dtos';
import {toGraphObjects, toRelations} from '../mappers';
import {RemoteService} from '../../core';

@ApiTags("graph")
@Controller("graph")
export class GraphController {

    constructor(private neo4jService: GraphService,
                private remoteService: RemoteService) {
    }

    @Get()
    getDbInfo(): Promise<any> {
        return this.neo4jService.getDbInfo();
    }

    @Get('node/:type')
    async getGraphObjectsByType(@Param("type") type: string): Promise<IGraphObject[]> {
        const response = await this.neo4jService.findNodesByType(type.toLowerCase());
        return toGraphObjects(response);
    }

    @Post('node/:type')
    @HttpCode(HttpStatus.OK)
    async getGraphObjectsByTypeWithQuery(@Param("type") type: string, @Body() graphQuery: GraphQueryDto): Promise<IGraphObject[]> {
        const response = await this.neo4jService.findNodesByTypeAndQuery(graphQuery);
        return toGraphObjects(response);
    }

    @Post('node/:type/remote')
    @HttpCode(HttpStatus.OK)
    async getGraphObjectByTypeWithQuery(@Param("type") type: string, @Body() graphQuery: GraphQueryDto): Promise<any> {
        const response = await this.neo4jService.findNodesByTypeAndQuery(graphQuery);
        const graphQueries: IRemoteResponse<IGraphObject[]>[] = [
            {
                host: 'local',
                name: 'local',
                data: toGraphObjects(response),
                error: false
            }
        ];
        const remoteResponses: IRemoteResponse<IGraphObject[]>[] = await this.remoteService.queryRemote('POST', `api/graph/node/${type}`, graphQuery);
        console.log('remoteResponses', remoteResponses);
        graphQueries.push(...remoteResponses);
        return graphQueries;
    }

    @Post("relation/create")
    @HttpCode(HttpStatus.OK)
    async createRelation(@Body() relationDto: GraphRelationDto): Promise<IGraphObject[]> {
        const response = await this.neo4jService.createRelation(relationDto);
        return toGraphObjects(response);
    }

    @Post("relation/read")
    @HttpCode(HttpStatus.OK)
    async readRelation(@Body() relationDto: GraphRelationDto): Promise<IGraphRelationsResponse[]> {
        const response = await this.neo4jService.readRelation(relationDto);
        const graphObjects: IGraphObject[] = toGraphObjects(response);
        return toRelations(graphObjects);
    }

    @Delete()
    async dropNodesAndRelations(): Promise<any> {
        return this.neo4jService.dropNodesAndRelations();
    }

    @Post("cypher")
    @HttpCode(HttpStatus.OK)
    async getResultByCypherQuery(@Body() query: { cypher: string }): Promise<IGraphObject[]> {
        if (query.cypher.toUpperCase().indexOf('DELETE') === -1 && query.cypher.toUpperCase().indexOf('REMOVE') === -1) {
            const response = await this.neo4jService.executeCypherQuery(query.cypher);
            return toGraphObjects(response);
        }
        throw new HttpException(`Cypher-Queries mit DELETE oder REMOVE dürfen nicht ausgeführt werden`, HttpStatus.BAD_REQUEST);
    }

}
