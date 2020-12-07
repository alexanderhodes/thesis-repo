import {Module} from '@nestjs/common';
import {AppController} from './controllers';
import {AppService, SchedulerService} from './services';
import {AppConfigModule} from '../app-config';

const controllers = [
    AppController
];
const services = [
    AppService,
    SchedulerService
];

@Module({
    imports: [
        AppConfigModule
    ],
    controllers: [
        ...controllers
    ],
    providers: [
        ...services
    ]
})
export class CoreModule {

}
