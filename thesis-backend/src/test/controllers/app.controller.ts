import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services';
import {ConfigurationService} from '../../app-config/services';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private configurationService: ConfigurationService) {}

  @Get()
  getHello(): string {
    const value = this.configurationService.get('MONGODB_PATH');
    const xyz = this.configurationService.get('BAZINGA');
    console.log('value', value, xyz);
    return this.appService.getHello();
  }
}
