import {HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Metadata} from '../models';
import {ConfigurationService} from '../../app-config';
import {BigchainBaseService} from './bigchain-base.service';

@Injectable()
export class MetadataService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                @InjectModel(Metadata.name) private metadataModel: Model<Metadata>) {
        super(configurationService, httpService);
    }

    async find(): Promise<Metadata[]> {
        return this.metadataModel.find();
    }

}

