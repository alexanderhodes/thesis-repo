import {Module} from '@nestjs/common';
import {AuthorizationModule} from '../authorization';
import {DatabaseModule} from '../database';
import {ObjectController, ObjectStructureController} from './controllers';

const controllers = [
    ObjectController,
    ObjectStructureController
];
const services = [];

@Module({
    controllers: [
        ...controllers
    ],
    exports: [],
    imports: [
        AuthorizationModule,
        DatabaseModule
    ],
    providers: [
        ...services
    ]
})
export class ObjectsModule {

}
