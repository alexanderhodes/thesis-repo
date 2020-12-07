import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {BlocksService} from '../services';

@ApiTags("blocks")
@Controller("blocks")
export class BlocksController {

    constructor(private blocksService: BlocksService) {}

    @Get()
    getAllBlocks(): Promise<any> {
        return this.blocksService.find();
    }

}
