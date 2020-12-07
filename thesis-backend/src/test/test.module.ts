import {Module} from '@nestjs/common';
import {TasksService} from './scheduler';

const services = [
    TasksService
];

@Module({
    imports: [],
    controllers: [],
    providers: [
        ...services
    ]
})
export class TestModule {

}
