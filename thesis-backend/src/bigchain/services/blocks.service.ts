import {HttpService, Injectable} from '@nestjs/common';
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config/services';
import {InjectModel} from '@nestjs/mongoose';
import {Blocks} from '../models';
import {Model} from 'mongoose';

@Injectable()
export class BlocksService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                @InjectModel(Blocks.name) private blocksModel: Model<Blocks>) {
        super(configurationService, httpService);
    }

    async find(): Promise<Blocks[]> {
        return this.blocksModel.find();
    }

}
