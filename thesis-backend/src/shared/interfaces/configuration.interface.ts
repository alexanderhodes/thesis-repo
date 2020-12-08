
export interface IRemoteConfig {
    protocol: string;
    nodes: INodeConfig[];
}

export interface INodeConfig {
    name: string;
    host: string;
}
