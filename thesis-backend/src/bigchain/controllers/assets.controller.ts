import {Controller, Get, Query} from '@nestjs/common';
import {AssetsService} from '../services';

@Controller("assets")
export class AssetsController {

    constructor(private assetsService: AssetsService) {}

    @Get()
    getAssetsBySearch(@Query("search") search: string,
                      @Query("limit") limit: string) {
        return this.assetsService.searchAssets(search, +limit);
    }

}
