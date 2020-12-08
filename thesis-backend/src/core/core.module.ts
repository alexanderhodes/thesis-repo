import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './controllers';
import {AppService, RemoteService, SchedulerService} from './services';
import {AppConfigModule} from '../app-config';

const controllers = [
    AppController
];
const services = [
    AppService,
    RemoteService,
    SchedulerService
];

@Module({
    imports: [
        AppConfigModule,
        HttpModule
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
