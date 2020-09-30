import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ConfigurationService} from './services';

const services = [
    ConfigurationService
];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.development.env`
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
