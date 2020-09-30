import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ScheduleModule} from "@nestjs/schedule";
import {TestModule} from './test';
import {AuthorizationModule} from './authorization';
import {BigchainModule} from './bigchain';
import {ApiModule} from './api';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Permission, User} from './database/entities';
import {AppConfigModule, ConfigurationService} from './app-config';
import {InsertPermissions1601456259497Migration} from './database/migrations';

// export function createTypeOrmConfigFactory(configService: ConfigurationService): TypeOrmModuleOptions {
//     const dbConfig: any = {
//         type: configService.get<string>('DATABASE_TYPE'),
//         host: configService.get<string>('DATABASE_HOST'),
//         port: Number(configService.get<string>('DATABASE_PORT')),
//         username: configService.get<string>('DATABASE_USERNAME'),
//         password: configService.get<string>('DATABASE_PASSWORD'),
//         database: configService.get<string>('DATABASE_NAME')
//     };
//
//     return {
//         ...dbConfig,
//         entities: [ Permission, User ],
//         synchronize: true,
//         migrationsTableName: 'migrations',
//         migrations: [
//             InsertPermissions1601456259497Migration
//         ],
//         cli: {
//             migrationsDir: "src/database/migrations"
//         }
//     }
// }

@Module({
    imports: [
//        MongooseModule.forRoot("mongodb://localhost:27018/bigchain"),
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
//            useFactory: createTypeOrmConfigFactory
        }),
        // TypeOrmModule.forRoot({
        //     type: 'postgres',
        //     host: 'localhost',
        //     port: 5432,
        //     username: 'admin',
        //     password: 'nimda',
        //     database: 'authentication',
        //     entities: [ Permission, User ],
        //     synchronize: true
        // }),
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
