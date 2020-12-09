import {Module} from '@nestjs/common';
import {KeypairService, HashingService} from './services';

const controllers = [];
const services = [
    KeypairService,
    HashingService
];

@Module({
    imports: [],
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
