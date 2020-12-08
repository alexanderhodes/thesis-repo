import {HttpService, Injectable} from '@nestjs/common';
import {ConfigurationService} from '../../app-config';
import {INodeConfig} from '../../shared';

@Injectable()
export class RemoteService {

    constructor(private httpService: HttpService,
                private configurationService: ConfigurationService) {
    }

    queryRemote(method: 'get' | 'GET' | 'post' | 'POST', url: string, body: any): Promise<any>[] {
        const queries = [];
        const remoteConfig = this.configurationService.createRemoteConfig();
        console.log('remotes', remoteConfig);

        remoteConfig.nodes.forEach((remote: INodeConfig) => {
            queries.push(this.httpService.request({
                method: method,
                data: body,
                baseURL: `${remoteConfig.protocol}://${remote.host}`,
                url: url,
                timeout: 5000
            }).toPromise().catch(() => {
                return {
                    config: {
                        baseURL: `${remoteConfig.protocol}://${remote.host}`
                    },
                    data: [],
                    error: true
                }
            }));
        })

        return queries;
    }

}
