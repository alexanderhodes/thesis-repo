import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ScheduleModule} from "@nestjs/schedule";
import {TestModule} from './test';
import {AuthorizationModule} from './authorization';
import {BigchainModule} from './bigchain';
import {ApiModule} from './api';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Permission, User} from './database/entities';

@Module({
    imports: [
        MongooseModule.forRoot("mongodb://localhost:27018/test"),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'nimda',
            database: 'authentication',
            entities: [ Permission, User ],
            synchronize: true
        }),
        AuthorizationModule,
        TestModule,
        BigchainModule,
        ApiModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
