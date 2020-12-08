import {HttpService, Injectable} from '@nestjs/common';
import {AxiosRequestConfig} from 'axios';
import {ConfigurationService} from '../../app-config';
import {INodeConfig, IRemoteConfig} from '../../shared';

type REQUEST_TYPES = 'get' | 'GET' | 'post' | 'POST';

@Injectable()
export class RemoteService {

    readonly #remoteConfig: IRemoteConfig;
    readonly #timeout: number = 5000;

    constructor(private httpService: HttpService,
                private configurationService: ConfigurationService) {
        this.#remoteConfig = this.configurationService.createRemoteConfig();
    }

    queryRemote(method: REQUEST_TYPES, url: string, body: any): Promise<any>[] {
        const queries = [];
        console.log('remoteConfig', this.#remoteConfig);

        this.#remoteConfig.nodes.forEach((remote: INodeConfig) => {
            queries.push(this.httpService.request(this._createRequest(method, url, body, remote))
                .toPromise()
                .catch(() => this._catchError(remote)));
        });

        return queries;
    }

    _createRequest(method: REQUEST_TYPES, url: string, body: any, remote: INodeConfig): AxiosRequestConfig {
        return {
            method: method,
            data: body,
            baseURL: `${this.#remoteConfig.protocol}://${remote.host}`,
            url: url,
            timeout: this.#timeout
        };
    }

    _catchError(remote: INodeConfig): any {
        return {
            config: {
                baseURL: `${this.#remoteConfig.protocol}://${remote.host}`
            },
            data: [],
            error: true
        };
    }

    getNodeNameForBaseURL(baseURL: string): string {
        const node = this.#remoteConfig.nodes.find(node => `${this.#remoteConfig.protocol}://${node.host}` === baseURL);
        return node ? node.name : '';
    }

}
