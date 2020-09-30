import {Controller, Get} from '@nestjs/common';
import {BlocksService} from '../../bigchain/services';

@Controller("api/blocks")
export class BlocksController {

    constructor(private blocksService: BlocksService) {}

    @Get()
    getAllBlocks(): Promise<any> {
        return this.blocksService.find();
    }

}
