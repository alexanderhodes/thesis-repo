import {HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config';
import {Assets} from '../models';
import {IAsset} from '../../shared';

@Injectable()
export class AssetsService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                @InjectModel(Assets.name) private assetModel: Model<Assets>) {
        super(configurationService, httpService);
    }

    searchAssets(search: string, limit?: number): Promise<IAsset> {
        return this.getConnection().searchAssets(search);
    }

    async find(): Promise<Assets[]> {
        return this.assetModel.find();
    }

    async findByUuid(uuid: string): Promise<Assets> {
        return this.assetModel.findOne({ "data.data.uuid": uuid});
    }

    async findAllByUuid(uuid: string): Promise<Assets[]> {
        return this.assetModel.find({ "data.data.uuid": uuid});
    }

}
