import {HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config';
import {Blocks} from '../models';

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
