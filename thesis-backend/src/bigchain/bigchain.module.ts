import {HttpModule, Module} from '@nestjs/common';
import {AppConfigModule} from '../app-config';
import {AssetsController, TransactionsController} from './controllers';
import {AssetsService, BigchainBaseService, TransactionsService} from './services';

const controllers = [
    AssetsController,
    TransactionsController
];
const services = [
    AssetsService,
    BigchainBaseService,
    TransactionsService
];

@Module({
    imports: [
        AppConfigModule,
        HttpModule
    ],
    controllers: [
        ...controllers
    ],
    providers: [
        ...services
    ]
})
export class BigchainModule {

}
