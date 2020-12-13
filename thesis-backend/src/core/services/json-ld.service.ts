import {Injectable} from '@nestjs/common';
import {IObjectStructure, Namespace} from '../../shared';

@Injectable()
export class JsonLdService {

    getContextForNamespace(type: Namespace, objectStructures: IObjectStructure[]): { [key: string ]: string } {
        let baseContext = {};
        if (type === 'occupation') {
            baseContext = this._getContextForOccupation();
        } else if (type === 'qualification') {
            baseContext = this._getContextForQualification();
        }
        objectStructures.forEach((objectStructure: IObjectStructure) => {
            baseContext[objectStructure.field] = objectStructure.schema;
        });
        baseContext['@vocab'] = 'http://schema.org/';
        return baseContext;
    }I

    private _getContextForOccupation(): { [key: string ]: string } {
        return this._getBaseContext();
    }

    private _getContextForQualification(): { [key: string ]: string }  {
        return this._getBaseContext();
    }

    private _getBaseContext(): { [key: string ]: string } {
        return {
            uuid: 'https://schema.org/identifier',
            identifier: 'https://schema.org/identifier',
            name: 'https://schema.org/name',
            description: 'https://schema.org/description',
            disambiguatingDescription: 'https://schema.org/disambiguatingDescription',
            status: 'https://schema.org/status',
            url: 'https://schema.org/url'
        }
    }
}
