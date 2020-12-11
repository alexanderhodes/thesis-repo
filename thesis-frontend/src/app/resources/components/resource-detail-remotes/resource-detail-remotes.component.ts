import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {GraphObject, RemoteResponse} from '../../../shared';

@Component({
  selector: 'ts-resource-detail-remotes',
  templateUrl: 'resource-detail-remotes.component.html',
  styleUrls: ['resource-detail-remotes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceDetailRemotesComponent {

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
