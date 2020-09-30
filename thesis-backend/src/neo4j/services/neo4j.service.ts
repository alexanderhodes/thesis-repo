import {Injectable} from '@nestjs/common';
import * as neo4j from "neo4j-driver";
import {ConfigurationService} from '../../app-config/services';

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

    async getDbInfo(): Promise<any> {
        return this.#session.run(`call db.info()`);
    }

}
