import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {INode, Neo4jService} from '../../neo4j';
import {IAsset, IOccupation, IQualification} from '../../shared/interfaces';
import {GraphQueryDto, RelationshipDto} from '../dtos';

@Controller("graph")
export class GraphController {

    constructor(private neo4jService: Neo4jService) {}

    @Get()
    getDbInfo(): Promise<any> {
        return this.neo4jService.getDbInfo();
    }

    @Get(':type')
    async getGraphObjectsByType(@Param("type") type: string): Promise<any[]> {
        const response = await this.neo4jService.findNodesByType(type.toLowerCase());
        const objects = [];
        response.records.forEach((record) => {
            let object;
            if (type.toLowerCase() === 'occupation') {
                object = record.toObject() as INode<IOccupation>
            } else if (type.toLowerCase() === '') {
                object = record.toObject() as INode<IQualification>
            } else {
                object = record.toObject() as INode<IAsset>
            }

            objects.push({
                label: object.n.labels,
                properties: object.n.properties
            });
        })
        return objects;
    }

    @Post('node/:type')
    async getGraphObjectsByTypeWithQuery(@Param("type") type: string, @Body() graphQuery: GraphQueryDto): Promise<any[]> {
        const response = await this.neo4jService.findNodesByTypeAndQuery(graphQuery);
        const objects = [];
        response.records.forEach((record) => {
            let object;
            if (type.toLowerCase() === 'occupation') {
                object = record.toObject() as INode<IOccupation>
            } else if (type.toLowerCase() === '') {
                object = record.toObject() as INode<IQualification>
            } else {
                object = record.toObject() as INode<IAsset>
            }
            if (object.n) {
                objects.push(object.n.properties);
            } else {
                objects.push(object);
            }
        })
        return objects;
    }

    @Post("relationship/")
    async createRelationship(@Body() relationshipDto: RelationshipDto): Promise<any> {
        const response = await this.neo4jService.createRelationship(relationshipDto);
        return response.records;
    }

    @Delete()
    async dropNodesAndRelations(): Promise<any> {
        return this.neo4jService.dropNodesAndRelations();
    }

    @Post("cypher")
    async getResultByCypherQuery(@Body() query: { cypher: string }) {
        if (query.cypher.toUpperCase().indexOf('DELETE') === -1 && query.cypher.toUpperCase().indexOf('REMOVE') === -1) {
            // ToDo: maybe parsing is necessary depending on relationship
            return this.neo4jService.executeCypherQuery(query.cypher);
        }
        throw new HttpException(`Cypher-Queries mit DELETE dürfen nicht ausgeführt werden`, HttpStatus.BAD_REQUEST);
    }

}
