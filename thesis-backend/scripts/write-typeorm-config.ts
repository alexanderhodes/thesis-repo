import fs = require('fs');

import { NestFactory } from '@nestjs/core';
import {AppConfigModule, ConfigurationService} from '../src/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppConfigModule);

  const appConfigService: ConfigurationService = app.get(
    'ConfigurationService',
  );

  fs.writeFileSync(
    'ormconfig.json',
    JSON.stringify(appConfigService.createTypeOrmConfigFactory(), null, 2),
  );
}
bootstrap();
