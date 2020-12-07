import {Module} from '@nestjs/common';
import {AppConfigModule} from '../app-config';
import {GraphService} from './services';
import {GraphController} from './controllers';
import {AuthorizationModule} from '../authorization';
import {SharedModule} from '../shared';

const controllers = [
    GraphController
]

const services = [
    GraphService
];

@Module({
    controllers: [
        ...controllers
    ],
    imports: [
        AppConfigModule,
        AuthorizationModule,
        SharedModule
    ],
    exports: [
        ...services
    ],
    providers: [
        ...services
    ]
})
export class GraphModule {

}
