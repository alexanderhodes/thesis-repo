import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {ColService} from "../services";
import {Col} from "../schemas";
import {CreateColDto, UpdateColDto} from "../dtos";

@Controller('cols')
export class ColController {

    constructor(private colService: ColService) {}

    @Get()
    findAll(): Promise<Col[]> {
        return this.colService.findAll();
    }

    @Get("query")
    findAllByQuery(@Query("name") name: string,
                   @Query("id") id: number,
                   @Query("limit") limit: string): Promise<Col[]> {
        return this.colService.findByQuery(name, id, +limit);
    }

    @Get(":id")
    find(@Param("id") id: string): Promise<Col> {
        return this.colService.find(id);
    }

    @Post()
    createCol(@Body() createColDto: CreateColDto): Promise<Col> {
        return this.colService.create(createColDto);
    }

    @Post("batch")
    createCols(@Body() createColDtos: CreateColDto[]) {
        // map to array of promises
        const createdCols = createColDtos.map((dto) => this.colService.create(dto));
        // resolve all of those promises and return the result with cols created
        return Promise.all(createdCols).then(result => {
            return result;
        });
    }

    @Put(":id")
    update(@Param("id") id: string,
           @Body() updateColDto: UpdateColDto): Promise<Col> {
        return this.colService.update(id, updateColDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.colService.delete(id);
    }

}
