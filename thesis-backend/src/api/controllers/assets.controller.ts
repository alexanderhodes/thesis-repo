import {Controller, Get, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AssetsService} from '../../bigchain/services';

@ApiTags("assets")
@Controller("assets")
export class AssetsController {

    constructor(private assetsService: AssetsService) {}

    @Get()
    getAllAssets(): Promise<any> {
        return this.assetsService.find();
    }

    @Get()
    getAssetsBySearch(@Query("search") search: string,
                      @Query("limit") limit: string) {
        return this.assetsService.searchAssets(search, +limit);
    }

}
