import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ts-error-message',
  template: `
    <div class="size-xs text-red-700">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class ErrorMessageComponent {

  // @Input()
  // text: string;
  @Input()
  show: boolean;

}
