import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {GraphObject, RemoteResponse} from '../../../shared';

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

  constructor() {
    this.reloadRemoteResponses = new EventEmitter<void>();
  }

  reload(): void {
    this.reloadRemoteResponses.emit();
  }

}
