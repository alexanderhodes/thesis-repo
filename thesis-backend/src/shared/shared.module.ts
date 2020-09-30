import {Module} from '@nestjs/common';
import {KeypairService} from './services';

const controllers = [];
const services = [
    KeypairService
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
