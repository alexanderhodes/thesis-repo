import {Module} from '@nestjs/common';
import {AppConfigModule} from '../app-config';
import {Neo4jService} from './services';

const services = [
    Neo4jService
];

@Module({
    imports: [
        AppConfigModule
    ],
    exports: [
        ...services
    ],
    providers: [
        ...services
    ]
})
export class Neo4jModule {

}
