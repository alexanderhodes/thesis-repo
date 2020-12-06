import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ColService} from './services';
import {TasksService} from './scheduler';
import {Col, ColSchema} from './schemas';
import {AppConfigModule} from '../app-config';

const services = [
    ColService,
    TasksService
];

@Module({
    imports: [
        MongooseModule.forFeature([{name: Col.name, schema: ColSchema}]),
        AppConfigModule
    ],
    controllers: [],
    providers: [
        ...services
    ]
})
export class TestModule {

}
