import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {readFileSync} from 'fs';
import {fileExistsSync} from 'tsconfig-paths/lib/filesystem';

declare const module: any;

interface Config {
    cors: { origin: string[], methods: string, preflightContinue: boolean },
    app: { port: number, apiPrefix: string }
}

function getConfig(): Config {
    const path = `${__dirname}/../config.json`;
    // check if file exists
    const fileExists = fileExistsSync(path);
    if (!fileExists) {
        console.log(`ERROR: file ${path} does not exist`);
        return null;
    }
    // read file
    const data = readFileSync(path, {encoding: 'utf-8'});
    if (!data) {
        console.log('ERROR: config file is empty');
        return null;
    }

    try {
        const config: Config = JSON.parse(data);
        console.log(`SUCCESS: read config file`, config);
        return config;
    } catch (e) {
        console.log('ERROR: parsing config file');
        return null;
    }
}

async function bootstrap() {
    const config: Config = getConfig();
    const app = await NestFactory.create(AppModule);

    if (config) {
        // enable cors
        app.enableCors(config.cors);
    }
    // set default app prefix with api so that it is not necessary in each controller
    app.setGlobalPrefix(config && config.app ? config.app.apiPrefix : 'api');
    await app.listen(config && config.app ? config.app.port : 3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
