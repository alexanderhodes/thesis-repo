import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ScheduleModule} from "@nestjs/schedule";
import {TypeOrmModule} from '@nestjs/typeorm';
import {TestModule} from './test';
import {BigchainModule} from './bigchain';
import {AppConfigModule, ConfigurationService} from './app-config';
import {CoreModule} from './core';
import {GraphModule} from './graph';
import {UsersModule} from './users';
import {ObjectsModule} from './objects';
import {RelationsModule} from './relations';

const featureModules = [
    BigchainModule,
    GraphModule,
    ObjectsModule,
    RelationsModule,
    UsersModule
];

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [ConfigurationService],
            useFactory: (configurationService: ConfigurationService) => configurationService.createMongoDbConfigFactory()
        }),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [ConfigurationService],
            useFactory: (configurationService: ConfigurationService) => configurationService.createTypeOrmConfigFactory()
        }),
        TestModule,
        CoreModule,
        ...featureModules
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
