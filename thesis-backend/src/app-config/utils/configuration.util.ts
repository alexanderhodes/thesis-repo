import {INodeConfig} from '../../shared';

export function createNodeConfig(nodeUrl: string): INodeConfig {
    const data = nodeUrl.split(':');
    return data && data.length === 2 ? {
        name: data[0],
        host: data[1]
    } : null;
}

export function createNodeConfigs(config: string): INodeConfig[] {
    const nodeUrls = config ? config.split(',') : [];
    const nodeConfigs: INodeConfig[] = [];
    nodeUrls.forEach(nodeUrl => {
        const nodeConfig = createNodeConfig(nodeUrl);
        if (nodeConfig) {
            nodeConfigs.push(nodeConfig);
        } else {
            console.error('node has to be splitted with : for name and host', nodeUrl);
        }
    })
    return nodeConfigs;
}
