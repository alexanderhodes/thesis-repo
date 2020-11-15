import {Module} from '@nestjs/common';
import {KeypairService, PasswordService} from './services';

const controllers = [];
const services = [
    KeypairService,
    PasswordService
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
