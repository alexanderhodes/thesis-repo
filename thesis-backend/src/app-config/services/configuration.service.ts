import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class ConfigurationService {

    constructor(private configService: ConfigService) {}

    get<T = any>(
        propertyPath: string,
        defaultValue: T = undefined,
    ): T | undefined {
        return this.configService.get<T | undefined>(propertyPath, defaultValue);
    }

}
