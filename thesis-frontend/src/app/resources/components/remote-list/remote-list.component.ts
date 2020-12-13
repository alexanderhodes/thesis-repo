import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {GraphObject, Node, RemoteResponse} from '../../../shared';
import {StateService, STORAGE_TEMP} from '../../../core';

@Component({
  selector: 'ts-remote-list',
  templateUrl: 'remote-list.component.html',
  styleUrls: ['remote-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteListComponent {

  @Input()
  remoteResponses: Array<RemoteResponse<GraphObject[]>>;
  @Output()
  reloadRemoteResponses: EventEmitter<void>;

  constructor(private router: Router,
              private stateService: StateService) {
    this.reloadRemoteResponses = new EventEmitter<void>();
  }

  reload(): void {
    this.reloadRemoteResponses.emit();
  }

  toRemoteResponseDetail(remoteResponses: RemoteResponse<GraphObject[]>): void {
    const end = this.router.url.indexOf('?custom');
    const url = end > 0 ? this.router.url.substring(0, end) : this.router.url;
    const node = (remoteResponses.data[0].data as Node);
    this.stateService.setItem(STORAGE_TEMP, remoteResponses);
    this.router.navigate([`${url}/remote/(${node.properties.uuid}`]).then();
  }

}
