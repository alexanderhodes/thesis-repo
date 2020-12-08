import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {
    ObjectEntity,
    ObjectStructureEntity,
    PermissionEntity,
    RelationEntity,
    RelationStructureEntity,
    RoleEntity,
    UserEntity
} from '../../database';
import {IRemoteConfig} from '../../shared';
import {createNodeConfigs} from '../utils';

@Injectable()
export class ConfigurationService {

    constructor(private configService: ConfigService) {
    }

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
            entities: [PermissionEntity, UserEntity, RoleEntity, RelationEntity, RelationStructureEntity, ObjectEntity, ObjectStructureEntity],
            synchronize: true,
            migrationsTableName: 'migrations',
//            migrations: [__dirname + '/../../**/database/migrations/*.migration.{ts,js}'],
            migrations: [],
            cli: {
                migrationsDir: __dirname + '/../../**/database/migrations/'
            }
        }
    }

    createMongoDbConfigFactory(): { uri: string } {
        return {
            uri: this.get<string>("MONGODB_PATH")
        };
    }

    createRemoteConfig(): IRemoteConfig {
        const protocol = this.get<string>('NODE_PROTOCOL');
        const nodeUrls = this.get<string>('NODE_URLS');
        const timeout = this.get<number>('NODE_TIMEOUT');
        const nodes = createNodeConfigs(nodeUrls);
        return { protocol, nodes, timeout };
    }
}
