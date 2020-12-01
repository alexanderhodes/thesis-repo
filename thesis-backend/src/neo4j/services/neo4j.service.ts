import {Injectable} from '@nestjs/common';
import * as neo4j from "neo4j-driver";
import {QueryResult} from "neo4j-driver";
import {ConfigurationService} from '../../app-config/services';
import {IAsset} from '../../shared/interfaces';
import {
    createNodeQueryForAsset,
    createNodeQueryWithQuery,
    createRelationship,
    DROP_NODES_AND_RELATIONS,
    getNodesByType
} from '../queries';
import {GraphQuery, Relationship} from '../interfaces';

@Injectable()
export class Neo4jService {

    #driver: neo4j.Driver;
    #session: neo4j.Session;

    constructor(private configurationService: ConfigurationService) {
        const path = this.configurationService.get<string>("NEO4J_PATH");
        const user = this.configurationService.get<string>("NEO4J_USER");
        const password = this.configurationService.get<string>("NEO4J_PASSWORD");
        this.#driver = neo4j.driver(path, neo4j.auth.basic(user, password));
        this.#session = this.#driver.session();
    }

    // nodes
    async createNode(asset: IAsset): Promise<QueryResult> {
        const query = createNodeQueryForAsset(asset);
        console.log('query', query);
        return this._executeQuery(query);
    }

    async findNodesByType(type: string): Promise<QueryResult> {
        const queryByTypes = getNodesByType(type);
        return this._executeQuery(queryByTypes);
    }

    async findNodesByTypeAndQuery(graphQuery: GraphQuery): Promise<QueryResult> {
        const queryByTypesAndQuery = createNodeQueryWithQuery(graphQuery);
        return this._executeQuery(queryByTypesAndQuery);
    }

    // relationships
    async createRelationship(relationship: Relationship): Promise<QueryResult> {
        const relationshipQuery = createRelationship(relationship);
        return this._executeQuery(relationshipQuery);
    }

    // general
    async getDbInfo(): Promise<any> {
        return this.#session.run(`call db.info()`);
    }

    async dropNodesAndRelations(): Promise<QueryResult> {
        return this._executeQuery(DROP_NODES_AND_RELATIONS);
    }

    async executeCypherQuery(query: string): Promise<QueryResult> {
        return this._executeQuery(query);
    }

    private async _executeQuery(query: string): Promise<QueryResult> {
        console.log('CYPHER:', query);
        const transaction = this.#session.beginTransaction();
        const result = await transaction.run(query);
        if (transaction.isOpen()) {
            await transaction.commit();
        }
        return result;
    }

}
