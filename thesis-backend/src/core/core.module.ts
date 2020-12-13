import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './controllers';
import {AppService, JsonLdService, RemoteService, SchedulerService} from './services';
import {AppConfigModule} from '../app-config';
import {DatabaseModule} from '../database';

const controllers = [
    AppController
];
const services = [
    AppService,
    JsonLdService,
    RemoteService,
    SchedulerService
];

@Module({
    imports: [
        AppConfigModule,
        HttpModule,
        DatabaseModule
    ],
    controllers: [
        ...controllers
    ],
    exports: [
        ...services
    ],
    providers: [
        ...services
    ]
})
export class CoreModule {

}
