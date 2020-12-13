import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AppService, JsonLdService} from '../services';
import {IAsset, IAssetWithContext} from '../../shared';
import {ObjectStructureService} from '../../database';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly jsonLdService: JsonLdService,
              private readonly objectStructureService: ObjectStructureService) {}

  @Get()
  getHello(): any {
    return this.appService.getApiConfig();
  }

  @Post('function/transform')
  @HttpCode(HttpStatus.OK)
  async getAsJsonLd(@Body() asset: IAsset): Promise<IAssetWithContext> {
    const objectStructures = await this.objectStructureService.findAllByObject(asset.namespace);
    const context = this.jsonLdService.getContextForNamespace(asset.namespace, objectStructures);
    return {...asset.data, '@context': context} as IAssetWithContext;
  }
}
