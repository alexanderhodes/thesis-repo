import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {BreadcrumbService} from '../../../core';

@Component({
  selector: 'ts-configuration',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class ConfigurationComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService,
              private router: Router,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.breadcrumbService.startBreadcrumb({
      text: this.asyncPipe.transform(this.translateService.get('common.configuration')),
      url: this.router.url
    });
    this.breadcrumbService.showBreadcrumb(true);
  }

}
