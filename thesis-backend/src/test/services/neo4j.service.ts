import {Injectable} from "@nestjs/common";
import * as neo4j from "neo4j-driver";
import {Employee} from "../interfaces";

@Injectable()
export class Neo4jService {

    #driver: neo4j.Driver;
    #session: neo4j.Session;

    constructor() {
        this.#driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "northwind"));
        this.#session = this.#driver.session();
    }

    async findAll(query?: string): Promise<any[]> {
        const result = await this.#session.run(`match (e:Employee ${query}) return e`);
        const records = result.records;
        return records.map(record => (<neo4j.Node> record.get(0)).properties);
    }

    async findAllByQuery(employee: Employee): Promise<any[]> {
        let query = '';
        Object.keys(employee).forEach(key => {
            if (employee[key]) {
                query = `${query}${key}: '${employee[key]}', `
            }
        });
        query = query.length ? `{${query.substring(0, query.length - 2)}}` : '';
        return this.findAll(query);
    }

    async findOne(): Promise<any> {
        const result = await this.#session.run("match (e:Employee) return e");
        const record = result.records && result.records.length ? result.records[0] : null;
        return record ? (<neo4j.Node> record.get(0)).properties : {};
    }

}
