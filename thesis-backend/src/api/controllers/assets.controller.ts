import {Controller, Get, Query} from '@nestjs/common';
import {AssetsService} from '../../bigchain/services';

@Controller("api/assets")
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
