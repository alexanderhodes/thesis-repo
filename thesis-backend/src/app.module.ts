import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ScheduleModule} from "@nestjs/schedule";
import {TypeOrmModule} from '@nestjs/typeorm';
import {TestModule} from './test';
import {AuthorizationModule} from './authorization';
import {BigchainModule} from './bigchain';
import {ApiModule} from './api';
import {AppConfigModule, ConfigurationService} from './app-config';
import {CoreModule} from './core';
import {GraphModule} from './graph';
import {UsersModule} from './users';

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
        AuthorizationModule,
        TestModule,
        BigchainModule,
        CoreModule,
        ApiModule,
        GraphModule,
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
