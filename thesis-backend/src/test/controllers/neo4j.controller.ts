import {Neo4jService} from "../services";
import {Controller, Get, Query} from "@nestjs/common";
import {Employee} from "../interfaces";

@Controller('neo4j')
export class Neo4jController {

    constructor(private neo4jService: Neo4jService) {}

    @Get("employees")
    findAllEmployees(@Query("lastName") lastName: string,
                     @Query("firstName") firstName: string,
                     @Query("employeeID") employeeID: string,
                     @Query("title") title: string): Promise<any[]> {
        const employee = <Employee> { lastName, firstName, employeeID: +employeeID, title };
        return this.neo4jService.findAllByQuery(employee);
    }

    @Get("employees/single")
    findOne(): Promise<any> {
        return this.neo4jService.findOne();
    }

}
