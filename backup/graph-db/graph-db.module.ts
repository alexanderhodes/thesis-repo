import {Module} from '@nestjs/common';

const controllers = [];
const services = [];

@Module({
    imports: [],
    controllers: [
        ...controllers
    ],
    providers: [
        ...services
    ]
})
export class GraphDbModule {

}
