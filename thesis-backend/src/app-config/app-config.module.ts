import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ConfigurationService} from './services';

const services = [
    ConfigurationService
];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`
        })
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
