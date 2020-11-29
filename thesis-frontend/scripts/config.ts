const {readFileSync, writeFileSync} = require('fs');
const {fileExistsSync} = require('tsconfig-paths/lib/filesystem');
const {exec} = require('child_process');

interface Config {
  apiUrl: string;
  nonApiPatterns: string[];
}

function createConfig(command: string, isProduction: boolean): void {
  // check if os is windows and exit if yes
  const isWindows = process.platform === 'win32';
  if (isWindows) {
    console.log('OS is windows, so nothing to do ...');
    return;
  }

  // define variables
  const options = {encoding: 'utf-8'};
  const path = `${__dirname}/../src/assets/config.json`;
  // check if file exists
  const fileExists = fileExistsSync(path);

  if (fileExists) {
    // read file
    const configFile = readFileSync(path, options);

    if (configFile) {
      const config: Config = JSON.parse(configFile);
      console.log('config', config);
      exec(command, (err, stdout) => {
        if (!err) {
          if (!isProduction) {
            stdout = stdout.split(' ')[0];
            console.log('updated ip address', stdout);
          }
          const hostname = stdout.replace('\n', '');
          console.log('hostname', hostname);
          if (hostname) {
            config.apiUrl = `https://${hostname}/api`;
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

const isProd = process.argv.indexOf('--prod') > -1;
const isLocal = process.argv.indexOf('--local') > -1;

if (isLocal) {
  // for local virtual machine -> use ip address instead of hostname
  console.log('create local config for local virtual machine by using ip address');
  const command = 'hostname -I';
  createConfig(command, false);
} else if (isProd) {
  // for virtual machine -> use full hostname
  console.log('create prod config by using full hostname');
  const command = 'hostname -f';
  createConfig(command, true);
} else {
  // for development environment
  console.log('nothing to do with dev config');
}
