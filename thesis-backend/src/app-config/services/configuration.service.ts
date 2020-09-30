import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Permission, User} from '../../database/entities';
import {InsertPermissions1601456259497Migration} from '../../database/migrations';
import {ConfigService} from '@nestjs/config';
import {MongooseModuleOptions} from '@nestjs/mongoose';

@Injectable()
export class ConfigurationService {

    constructor(private configService: ConfigService) {}

    get<T = any>(
        propertyPath: string,
        defaultValue: T = undefined,
    ): T | undefined {
        return this.configService.get<T | undefined>(propertyPath, defaultValue);
    }

    createTypeOrmConfigFactory(): TypeOrmModuleOptions {
        const dbConfig: any = {
            type: this.get<string>('DATABASE_TYPE'),
            host: this.get<string>('DATABASE_HOST'),
            port: Number(this.get<string>('DATABASE_PORT')),
            username: this.get<string>('DATABASE_USERNAME'),
            password: this.get<string>('DATABASE_PASSWORD'),
            database: this.get<string>('DATABASE_NAME')
        };

        return {
            ...dbConfig,
//            entities: [__dirname + '/../../**/database/entities/*.entity.{ts,js}'],
            entities: [Permission, User],
            synchronize: true,
            migrationsTableName: 'migrations',
//            migrations: [__dirname + '/../../**/database/migrations/*.migration.{ts,js}'],
            migrations: [InsertPermissions1601456259497Migration],
            cli: {
                migrationsDir: __dirname + '/../../**/database/migrations/'
            }
        }
    }

    createMongoDbConfigFactory(): { uri: string } {
        return {
            uri: this.get<string>("MONGODB_PATH"),
        };
    }

}
