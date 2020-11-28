import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ColController, Neo4jController} from './controllers';
import {ColService, Neo4jService} from './services';
import {TasksService} from './scheduler';
import {Col, ColSchema} from './schemas';
import {AppConfigModule} from '../app-config';

const controllers = [
    ColController,
    Neo4jController
];

const services = [
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
