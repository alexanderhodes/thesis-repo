import {Controller, HttpService} from '@nestjs/common';
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config/services';
import {IAsset} from '../interfaces';

@Controller()
export class AssetsService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService) {
        super(configurationService, httpService);
    }

    searchAssets(search: string, limit?: number): Promise<IAsset> {
        return this.getConnection().searchAssets(search);
    }

}
