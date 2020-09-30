import {Controller, Get} from '@nestjs/common';
import {Neo4jService} from '../../neo4j/services';

@Controller("api/graph")
export class GraphController {

    constructor(private neo4jService: Neo4jService) {}

    @Get()
    getDbInfo(): Promise<any> {
        return this.neo4jService.getDbInfo();
    }

}
