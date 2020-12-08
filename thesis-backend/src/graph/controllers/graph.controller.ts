import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {GraphService} from '../services';
import {IGraphObject} from '../../shared';
import {GraphQueryDto, GraphRelationDto} from '../dtos';
import {toGraphObjects} from '../mappers';
import {RemoteService} from '../../core';

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
    async getGraphObjectsByTypeWithQuery(@Param("type") type: string, @Body() graphQuery: GraphQueryDto): Promise<IGraphObject[]> {
        const response = await this.neo4jService.findNodesByTypeAndQuery(graphQuery);
        return toGraphObjects(response);
    }

    @Post('node/:type/remote')
    async getGraphObjectByTypeWithQuery(@Param("type") type: string, @Body() graphQuery: GraphQueryDto): Promise<any> {
        const remoteQueries = await Promise.all(this.remoteService.queryRemote('POST', `api/graph/node/${type}`, graphQuery));
        const response = await this.neo4jService.findNodesByTypeAndQuery(graphQuery);
        const graphQueries = [
            {
                host: 'local',
                data: toGraphObjects(response),
                error: false
            }
        ];
        remoteQueries.forEach(query => {
            graphQueries.push({ host: query.config.baseURL, data: toGraphObjects(query.data), error: !!query.error });
        })
        return graphQueries;
    }

    @Post("relation/create")
    async createRelation(@Body() relationDto: GraphRelationDto): Promise<IGraphObject[]> {
        const response = await this.neo4jService.createRelation(relationDto);
        return toGraphObjects(response);
    }

    @Post("relation/read")
    async readRelation(@Body() relationDto: GraphRelationDto): Promise<IGraphObject[]> {
        const response = await this.neo4jService.readRelation(relationDto);
        return toGraphObjects(response);
    }

    @Delete()
    async dropNodesAndRelations(): Promise<any> {
        return this.neo4jService.dropNodesAndRelations();
    }

    @Post("cypher")
    async getResultByCypherQuery(@Body() query: { cypher: string }): Promise<IGraphObject[]> {
        if (query.cypher.toUpperCase().indexOf('DELETE') === -1 && query.cypher.toUpperCase().indexOf('REMOVE') === -1) {
            const response = await this.neo4jService.executeCypherQuery(query.cypher);
            return toGraphObjects(response);
        }
        throw new HttpException(`Cypher-Queries mit DELETE oder REMOVE dürfen nicht ausgeführt werden`, HttpStatus.BAD_REQUEST);
    }

}
