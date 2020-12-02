import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {take, takeUntil} from 'rxjs/operators';
import {ObjectStructureApiService, TransactionsApiService} from '../../../core/http';
import {CleanUpHelper} from '../../../core/utils';
import {StateService, STORAGE_USER} from '../../../core/services';
import {
  IObjectStructure,
  KeyPair,
  Occupation,
  Qualification,
  Relation,
  Resource,
  StorageUser
} from '../../../shared/interfaces';

@Component({
  selector: 'ts-occupations',
  templateUrl: 'occupations.component.html',
  styleUrls: ['occupations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class OccupationsComponent extends CleanUpHelper implements OnInit {

  #publicKey: string;
  objectStructure: IObjectStructure[];

  constructor(private transactionApiService: TransactionsApiService,
              private objectStructureApiService: ObjectStructureApiService,
              private stateService: StateService) {
    super();
  }

  ngOnInit(): void {
    this.stateService.getItem$(STORAGE_USER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: StorageUser) => {
        this.#publicKey = data && data.publicKey ? data.publicKey : null;
      });
    this.objectStructureApiService.getObjectStructuresByObject('occupation')
      .pipe(take(1))
      .subscribe((objectStructures: IObjectStructure[]) => {
        console.log('objectStructures', objectStructures);
        this.objectStructure = objectStructures;
      }, (error) => {
        console.log('error', error);
        this.objectStructure = [];
      });
  }

  createTransaction(): void {
    const softwareDeveloper: Occupation = {
      namespace: 'occupation',
      data: {
        identifier: '2512.3',
        name: 'Softwareentwickler',
        description: `Softwareentwickler implementieren oder programmieren Softwaresystemen jeder Art auf der Grundlage von Spezifikationen bzw. Entwürfen unter Einsatz von Programmiersprachen, Tools und Plattformen.`,
        disambiguatingDescription: '',
        hierarchy: [],
        narrowerOccupations: [],
        occupationalCategory: '',
        skills: [],
        status: 'released',
        url: 'http://data.europa.eu/esco/occupation/04ba4d6c-957d-417f-bf63-5b9e015a9f86'
      }
    };
    const softwareAnalytiker: Occupation = {
      namespace: 'occupation',
      data: {
        identifier: '2512.1',
        name: 'Softwareanalytiker',
        description: `Softwareanalytiker ermitteln und priorisieren Nutzeranforderungen, erstellen und dokumentieren Softwarespezifikationen, testen ihre Anwendung und überprüfen sie während der Softwareentwicklung. Sie fungieren als Schnittstelle zwischen Software-Anbietern und dem Software-Entwicklungsteam.`,
        disambiguatingDescription: '',
        hierarchy: [],
        narrowerOccupations: [],
        occupationalCategory: '',
        skills: [],
        status: 'released',
        url: 'http://data.europa.eu/esco/occupation/04ba4d6c-957d-417f-bf63-5b9e015a9f86'
      }
    };
    const softwareArchitect: Occupation = {
      namespace: 'occupation',
      data: {
        identifier: '2512.2',
        name: 'Softwarearchitekt',
        description: `Softwarearchitekten erstellen das technische Konzept und das funktionale Modell eines Softwaresystems auf der Grundlage funktionaler Spezifikationen. Außerdem gestalten sie die Architektur des Systems oder verschiedene Module und Komponenten im Einklang mit den Anforderungen der Unternehmen oder Kunden, der technischen Plattform, der Computersprache oder der Entwicklungsumgebung.`,
        disambiguatingDescription: '',
        hierarchy: [],
        narrowerOccupations: [],
        occupationalCategory: '',
        skills: [],
        status: 'released',
        url: 'http://data.europa.eu/esco/occupation/d0aa0792-4345-474b-9365-686cf4869d2e'
      }
    };
    const developerForUserInterface: Occupation = {
      namespace: 'occupation',
      data: {
        identifier: '2512.4',
        name: 'Entwickler von Benutzeroberflächen/Entwicklerin von Benutzeroberflächen',
        description: `Entwickler von Benutzeroberflächen gestalten die Benutzeroberfläche eines Softwaresystems durch den Einsatz von Entwicklungstechnologien für das Frontend. Sie programmieren, dokumentieren und pflegen die Benutzerschnittstelle eines Softwaresystems.`,
        disambiguatingDescription: '',
        hierarchy: [],
        narrowerOccupations: [],
        occupationalCategory: '',
        skills: [],
        status: 'released',
        url: 'http://data.europa.eu/esco/occupation/866c7813-2c03-47d7-9bdc-192cfbace57c'
      }
    };
    const occupations = [softwareDeveloper, softwareAnalytiker, softwareArchitect, developerForUserInterface];

    const relation: Relation = {
      namespace: 'relation',
      data: {
        attributes: {
          relation: true,
          name: 'works well with Softwareentwickler'
        },
        name: 'works_with',
        direction: 'in',
        left: {
          namespace: 'occupation',
          condition: {
            identifier: '2512.1'
          }
        },
        right: {
          namespace: 'occupation',
          condition: {
            identifier: '2512.4'
          }
        }
      }
    };

    const privateKey = '8CDnuWXXDPRB8Zn8bd22U52qhLAfaU3NZZeYDrHZA14m';
    console.log('public-key', this.#publicKey);
    if (this.#publicKey) {
      const keyPair: KeyPair = {
        privateKey,
        publicKey: this.#publicKey
      };
      occupations.forEach(occupation => {
        this.transactionApiService.createTransaction(occupation, keyPair)
          .pipe(take(1))
          .subscribe(response => {
            console.log('response', response);
          }, (error) => console.log('error', error));
      });
      this.transactionApiService.createTransaction(relation, keyPair)
        .pipe(take(1))
        .subscribe(response => {
          console.log('response', response);
        }, (error) => console.log('error', error));
    }
  }

  createQualifications(): void {
    const qualifications: Qualification[] = [];
    qualifications.push({
      namespace: 'qualification',
      data: {
        identifier: 'configure-interface',
        name: 'Benutzerschnittstelle konzipieren',
        description: 'Entwicklung von Software- oder Gerätekomponenten, die eine Interaktion zwischen Menschen und Systemen oder Maschinen ermöglichen, unter Verwendung geeigneter Techniken, Sprachen und Werkzeuge zur Optimierung der Interaktion während der Nutzung des Systems oder der Maschine.',
        disambiguatingDescription: '',
        status: 'released',
        url: 'http://data.europa.eu/esco/skill/fd33c66c-70c4-40e6-b87c-5495bd3bf26e'
      }
    });
    qualifications.push({
      namespace: 'qualification',
      data: {
        identifier: 'configure-interface',
        name: 'technische Anforderungen definieren',
        description: 'Festlegen technischer Eigenschaften von Waren, Materialien, Methoden, Verfahren, Diensten, Systemen, Softwarelösungen und Funktionalitäten, indem die besonderen Bedürfnisse, die gemäß den Kundenanforderungen erfüllt werden müssen, ermittelt und berücksichtigt werden.',
        disambiguatingDescription: 'technische Anforderungen festlegen',
        status: 'released',
        url: 'http://data.europa.eu/esco/skill/d9e5349e-8791-49c2-8ba4-839fdd1606c2'
      }
    });

    const privateKey = '8CDnuWXXDPRB8Zn8bd22U52qhLAfaU3NZZeYDrHZA14m';
    console.log('public-key', this.#publicKey);
    if (this.#publicKey) {
      const keyPair: KeyPair = {
        privateKey,
        publicKey: this.#publicKey
      };
      qualifications.forEach(qualification => {
        this.transactionApiService.createTransaction(qualification, keyPair)
          .pipe(take(1))
          .subscribe(response => {
            console.log('response', response);
          }, (error) => console.log('error', error));
      });
    }
  }

  createSkills(): void {
    const skills: Resource[] = [];
    skills.push({
      namespace: 'skill',
      data: {
        identifier: 'C++',
        description: 'C++',
        disambiguatingDescription: '',
        name: 'C++',
        status: 'released',
        url: ''
      }
    });
    skills.push({
      namespace: 'skill',
      data: {
        identifier: 'Angular',
        description: 'Angular',
        disambiguatingDescription: '',
        name: 'Angular',
        status: 'released',
        url: ''
      }
    });

    const privateKey = '8CDnuWXXDPRB8Zn8bd22U52qhLAfaU3NZZeYDrHZA14m';
    console.log('public-key', this.#publicKey);
    if (this.#publicKey) {
      const keyPair: KeyPair = {
        privateKey,
        publicKey: this.#publicKey
      };
      skills.forEach(skill => {
        this.transactionApiService.createTransaction(skill, keyPair)
          .pipe(take(1))
          .subscribe(response => {
            console.log('response', response);
          }, (error) => console.log('error', error));
      });
    }
  }

}
