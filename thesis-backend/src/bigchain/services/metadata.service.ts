import {HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {MetadataModel} from '../models';
import {ConfigurationService} from '../../app-config';
import {BigchainBaseService} from './bigchain-base.service';

@Injectable()
export class MetadataService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                @InjectModel(MetadataModel.name) private metadataModel: Model<MetadataModel>) {
        super(configurationService, httpService);
    }

    async find(): Promise<MetadataModel[]> {
        return this.metadataModel.find();
    }

}

