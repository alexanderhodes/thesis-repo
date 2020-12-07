import {Module} from '@nestjs/common';
import {AuthorizationModule} from '../authorization';
import {DatabaseModule} from '../database';
import {SharedModule} from '../shared';
import {RelationController, RelationStructureController} from './controllers';

const controllers = [
    RelationController,
    RelationStructureController
];
const services = [];

@Module({
    controllers: [
        ...controllers
    ],
    exports: [],
    imports: [
        AuthorizationModule,
        DatabaseModule,
        SharedModule
    ],
    providers: [
        ...services
    ]
})
export class RelationsModule {

}
