import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {BreadcrumbService, StateService, STORAGE_TEMP} from '../../../core';
import {GraphObject, Node, RemoteResponse} from '../../../shared';

@Component({
  selector: 'ts-remote-detail',
  templateUrl: 'remote-detail.component.html',
  styleUrls: ['remote-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class RemoteDetailComponent implements OnInit, OnDestroy {

  remoteResponses: RemoteResponse<GraphObject[]>;

  constructor(private router: Router,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private stateService: StateService,
              private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.stateService.getItem$(STORAGE_TEMP).pipe(take(1))
      .subscribe((remoteResponses: RemoteResponse<GraphObject[]>) => {
        this.remoteResponses = remoteResponses;
      });

    this.breadcrumbService.newBreadcrumb({
      text: this.asyncPipe.transform(this.translateService.get('common.remote')),
      url: this.router.url
    });
  }

  ngOnDestroy(): void {
    this.breadcrumbService.removeLastBreadcrumb();
  }

  getRemoteResponseData(): { [key: string]: any } {
    if (this.remoteResponses.data && this.remoteResponses.data[0]) {
      console.log('props', (this.remoteResponses.data[0].data as Node).properties);
      return (this.remoteResponses.data[0].data as Node).properties;
    }
    return {};
  }

}
