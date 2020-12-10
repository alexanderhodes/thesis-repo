import {HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config';
import {BlockModel} from '../models';

@Injectable()
export class BlocksService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                @InjectModel(BlockModel.name) private blocksModel: Model<BlockModel>) {
        super(configurationService, httpService);
    }

    async find(): Promise<BlockModel[]> {
        return this.blocksModel.find();
    }

}
