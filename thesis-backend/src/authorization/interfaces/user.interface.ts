export interface User {
    id: string;
    username: string;
    password?: string;
    permissions: string[];
    keyPair?: {
        privateKey: string;
        publicKey: string;
    }
}
