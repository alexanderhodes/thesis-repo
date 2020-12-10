import {HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config';
import {AssetModel} from '../models';
import {IAsset} from '../../shared';

@Injectable()
export class AssetsService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                @InjectModel(AssetModel.name) private assetModel: Model<AssetModel>) {
        super(configurationService, httpService);
    }

    searchAssets(search: string, limit?: number): Promise<IAsset> {
        return this.getConnection().searchAssets(search);
    }

    async find(): Promise<AssetModel[]> {
        return this.assetModel.find();
    }

    async findByUuid(uuid: string): Promise<AssetModel> {
        return this.assetModel.findOne({ "data.data.uuid": uuid});
    }

    async findAllByUuid(uuid: string): Promise<AssetModel[]> {
        return this.assetModel.find({ "data.data.uuid": uuid});
    }

}
