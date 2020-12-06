import {HttpService, Injectable} from '@nestjs/common';
import {ConfigurationService} from '../../app-config';

@Injectable()
export class RemoteService {

    constructor(private httpService: HttpService,
                private configurationService: ConfigurationService) {}

    queryRemote(method: 'get' | 'GET' | 'post' | 'POST', url: string, body: any): Array<Promise<any>> {
        const queries = [];
        const remotes = this.configurationService.createNodesConfig();
        console.log('remotes', remotes);

        remotes.forEach(remote => {
            queries.push(this.httpService.request({
                method: method,
                data: body,
                baseURL: `http://${remote}`,
                url: url
            }).toPromise());
        })

        return queries;
    }

}
