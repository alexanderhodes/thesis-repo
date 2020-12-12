import {Injectable} from '@nestjs/common';
import * as neo4j from "neo4j-driver";
import {QueryResult} from "neo4j-driver";
import {ConfigurationService} from '../../app-config';
import {IAsset} from '../../shared';
import {
    createNodeQueryForAsset,
    createNodeQueryWithQuery,
    createRelation, deleteRelation,
    DROP_NODES_AND_RELATIONS,
    getNodesByType,
    readRelation, updateNodeQueryForAsset, updateRelation
} from '../queries';
import {GraphQuery, Relation} from '../interfaces';

@Injectable()
export class GraphService {

    #driver: neo4j.Driver;
//    #session: neo4j.Session;

    constructor(private configurationService: ConfigurationService) {
        const path = this.configurationService.get<string>("NEO4J_PATH");
        const user = this.configurationService.get<string>("NEO4J_USER");
        const password = this.configurationService.get<string>("NEO4J_PASSWORD");
        this.#driver = neo4j.driver(path, neo4j.auth.basic(user, password));
//        this.#session = this.#driver.session();
    }

    // nodes
    async createNode(asset: IAsset): Promise<QueryResult> {
        const query = createNodeQueryForAsset(asset);
        return this._executeQuery(query);
    }

    async updateNode(asset: IAsset): Promise<QueryResult> {
        const query = updateNodeQueryForAsset(asset);
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

    // relations
    async createRelation(relation: Relation): Promise<QueryResult> {
        const relationQuery = createRelation(relation);
        return this._executeQuery(relationQuery);
    }

    async updateRelation(relation: Relation): Promise<QueryResult> {
        const relationQuery = updateRelation(relation);
        return this._executeQuery(relationQuery);
    }

    async deleteRelation(relation: Relation): Promise<QueryResult> {
        const relationQuery = deleteRelation(relation);
        return this._executeQuery(relationQuery);
    }

    async readRelation(relation: Relation): Promise<QueryResult> {
        const relationQuery = readRelation(relation);
        return this._executeQuery(relationQuery);
    }

    // general
    async getDbInfo(): Promise<any> {
        const session = this.#driver.session();
        const result = session.run(`call db.info()`)
        session.close();
        return result;
    }

    async dropNodesAndRelations(): Promise<QueryResult> {
        return this._executeQuery(DROP_NODES_AND_RELATIONS);
    }

    async executeCypherQuery(query: string): Promise<QueryResult> {
        return this._executeQuery(query);
    }

    private async _executeQuery(query: string): Promise<QueryResult> {
        const session = this.#driver.session();
        console.log('CYPHER:', query);
        const transaction = session.beginTransaction();
        const result = await transaction.run(query);
        if (transaction.isOpen()) {
            await transaction.commit();
        }
        session.close();
        return result;
    }

}
