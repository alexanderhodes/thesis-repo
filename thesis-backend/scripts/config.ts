import {readFileSync, writeFileSync} from 'fs';
import {fileExistsSync} from 'tsconfig-paths/lib/filesystem';

const {exec} = require('child_process');

interface Config {
    cors: {
        origin: string[],
        methods: string,
        preflightContinue: boolean
    },
    app: {
        port: number,
        apiPrefix: string
    }
}

function createConfig(): void {
    // check if os is windows and exit if yes
    const isWindows = process.platform === 'win32';
    if (isWindows) {
        console.log('OS is windows, so nothing to do ...');
        return;
    }

    // define variables
    const options = {encoding: 'utf-8'};
    const path = `${__dirname}/../src/config.json`;
    // check if file exists
    const fileExists = fileExistsSync(path);

    if (fileExists && !isWindows) {
        // read file
        const configFile = readFileSync(path, options);

        if (configFile) {
            const config: Config = JSON.parse(configFile);
            console.log('config', config);
            exec('hostname -f', (err, stdout) => {
                if (!err) {
                    const hostname = stdout.replace('\n', '');
                    console.log('hostname', hostname);
                    if (hostname) {
                        const remoteOrigin = `https://${hostname}`;
                        config.cors.origin.push(remoteOrigin);
                    }
                }
                console.log('updated config', config);
                const data = JSON.stringify(config);
                writeFileSync(path, data, options);
            });
        }
    } else {
        console.log(`could not read config - ${path} not found`);
    }
}

createConfig();
