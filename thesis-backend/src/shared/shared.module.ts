import {HttpModule, Module} from '@nestjs/common';
import {KeypairService, PasswordService, RemoteService} from './services';
import {AppConfigModule} from '../app-config';

const controllers = [];
const services = [
    KeypairService,
    PasswordService,
    RemoteService
];

@Module({
    imports: [
        HttpModule,
        AppConfigModule
    ],
    exports: [
        ...services
    ],
    controllers: [
        ...controllers
    ],
    providers: [
        ...services
    ]
})
export class SharedModule {

}
