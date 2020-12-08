import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ConfigurationService} from './services';
import {SharedModule} from '../shared';

const services = [
    ConfigurationService
];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        SharedModule
    ],
    exports: [
        ...services
    ],
    providers: [
        ...services
    ]
})
export class AppConfigModule {

}
