import {HttpService, Injectable} from '@nestjs/common';
import {AxiosRequestConfig} from 'axios';
import {ConfigurationService} from '../../app-config';
import {INodeConfig, IRemoteConfig, IRemoteResponse} from '../../shared';

type RequestType = 'get' | 'GET' | 'post' | 'POST';

@Injectable()
export class RemoteService {

    readonly #remoteConfig: IRemoteConfig;

    constructor(private httpService: HttpService,
                private configurationService: ConfigurationService) {
        this.#remoteConfig = this.configurationService.createRemoteConfig();
    }

    async queryRemote(method: RequestType, url: string, body: any, parser: (any) => any): Promise<IRemoteResponse[]> {
        const responses: IRemoteResponse[] = [];
        const remoteQueries = await Promise.all(this._queryRemote(method, url, body));

        remoteQueries.forEach(query => {
            responses.push({
                host: query.config.baseURL,
                name: this._getNodeNameForBaseURL(query.config.baseURL),
                data: parser(query.data),
                error: !!query.error
            } as IRemoteResponse);
        })

        return responses;
    }

    _queryRemote(method: RequestType, url: string, body: any): Promise<any>[] {
        const queries = [];
        console.log('remoteConfig', this.#remoteConfig);

        this.#remoteConfig.nodes.forEach((remote: INodeConfig) => {
            queries.push(this.httpService.request(this._createRequest(method, url, body, remote))
                .toPromise()
                .catch(() => this._catchError(remote)));
        });

        return queries;
    }

    private _createRequest(method: RequestType, url: string, body: any, remote: INodeConfig): AxiosRequestConfig {
        return {
            method: method,
            data: body,
            baseURL: `${this.#remoteConfig.protocol}://${remote.host}`,
            url: url,
            timeout: this.#remoteConfig.timeout
        };
    }

    private _catchError(remote: INodeConfig): any {
        return {
            config: {
                baseURL: `${this.#remoteConfig.protocol}://${remote.host}`
            },
            data: [],
            error: true
        };
    }

    private _getNodeNameForBaseURL(baseURL: string): string {
        const node = this.#remoteConfig.nodes.find(node => `${this.#remoteConfig.protocol}://${node.host}` === baseURL);
        return node ? node.name : '';
    }

}
