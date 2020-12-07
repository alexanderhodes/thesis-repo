import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AssetsService} from '../services';

@ApiTags("assets")
@Controller("assets")
export class AssetsController {

    constructor(private assetsService: AssetsService) {}

    @Get()
    getAllAssets(): Promise<any> {
        return this.assetsService.find();
    }

    @Get(":uuid")
    getAssetByUuid(@Param("uuid") uuid: string): Promise<any> {
        return this.assetsService.findByUuid(uuid);
    }

}
