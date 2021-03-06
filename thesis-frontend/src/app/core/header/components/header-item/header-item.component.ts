import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ts-header-item',
  template: `
    <div *tsHasPermission="permission"
         [routerLink]="[routerLink]" [routerLinkActive]="['font-bold']"
         [routerLinkActiveOptions]="{exact: false}"
         class="text-white cursor-pointer hover:underline inline-block mr-3">
      <ng-content></ng-content>
    </div>
  `,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderItemComponent {

  @Input()
  routerLink !: string;
  @Input()
  permission !: string;

}
