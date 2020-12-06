import {HttpService, Injectable} from '@nestjs/common';
import {ConfigurationService} from '../../app-config';
import driver = require('bigchaindb-driver');

@Injectable()
export class BigchainBaseService {

    readonly #_apiPath: string;
    readonly #_driver: any;
    #_connection: any;

    constructor(public configurationService: ConfigurationService,
                private httpService: HttpService) {
        this.#_apiPath = this.configurationService.get<string>("BIGCHAIN_DB_API_PATH");
        this.#_driver = driver;
    }

    getConnection() {
        if (!this.#_connection) {
            this.#_connection = new this.driver.Connection(this.#_apiPath);
        }


        return this.#_connection;
    }

    async post<T>(path: string, body: any): Promise<T> {
        return this._mapData<T>(((resolve, reject) => {
            this.httpService.post(`${this.#_apiPath}${path}`, body)
                .subscribe(
                    (response) => this._handleSuccessResponse(response, resolve),
                    (error) => this._handleErrorResponse(error, reject)
                );
        }));
    }

    async get<T>(path: string): Promise<T> {
        return this._mapData<T>(((resolve, reject) => {
            this.httpService.get(`${this.#_apiPath}${path}`)
                .subscribe(
                    (response) => this._handleSuccessResponse(response, resolve),
                    (error) => this._handleErrorResponse(error, reject)
                );
        }));
    }

    private _mapData<T>(callback: (resolve, reject) => void): Promise<T> {
        return new Promise(((resolve, reject) => {
            return callback(resolve, reject)
        }));
    }

    private _handleSuccessResponse(response, resolve) {
        console.log('response', response.data);
        console.log('status', response.status);
        resolve(response.data);
    }

    private _handleErrorResponse(error, reject) {
        reject(error);
    }

    get apiPath(): string {
        return this.#_apiPath;
    }

    get driver(): any {
        return this.#_driver;
    }

}
