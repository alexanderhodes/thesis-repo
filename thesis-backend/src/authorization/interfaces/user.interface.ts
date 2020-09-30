export interface User {
    id: number;
    username: string;
    password?: string;
    permissions: string[];
    keyPair?: {
        privateKey: string;
        publicKey: string;
    }
}
