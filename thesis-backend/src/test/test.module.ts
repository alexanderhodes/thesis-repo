import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController, ColController, Neo4jController} from './controllers';
import {AppService, ColService, Neo4jService} from './services';
import {TasksService} from './scheduler';
import {Col, ColSchema} from './schemas';
import {AppConfigModule} from '../app-config';

const controllers = [
    AppController,
    ColController,
    Neo4jController
];

const services = [
    AppService,
    ColService,
    Neo4jService,
    TasksService
];

@Module({
    imports: [
        MongooseModule.forFeature([{name: Col.name, schema: ColSchema}]),
        AppConfigModule
    ],
    controllers: [
        ...controllers
    ],
    providers: [
        ...services
    ]
})
export class TestModule {

}
