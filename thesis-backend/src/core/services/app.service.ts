import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    getApiConfig(): any {
        return {
            api: 'api',
            swagger: 'swagger'
        };
    }
}
