
export interface IRemoteConfig {
    protocol: string;
    nodes: INodeConfig[];
    timeout: number;
}

export interface INodeConfig {
    name: string;
    host: string;
}
