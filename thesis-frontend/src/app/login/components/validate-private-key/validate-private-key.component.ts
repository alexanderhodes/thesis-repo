import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {LoginApiService, StateService, STORAGE_USER} from '../../../core';
import {IMessage, StorageUser, ValidatePrivateKey} from '../../../shared';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ts-validate-private-key',
  templateUrl: 'validate-private-key.component.html',
  styleUrls: ['validate-private-key.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class ValidatePrivateKeyComponent {

  privateKey: string;
  message: IMessage;

  constructor(private loginApiService: LoginApiService,
              private router: Router,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef,
              private stateService: StateService) {}

  validate(): void {
    const validatePrivateKeyBody: ValidatePrivateKey = {
      privateKey: this.privateKey
    };
    this.loginApiService.validatePrivateKey(validatePrivateKeyBody)
      .pipe(take(1))
      .subscribe(() => {
        this.stateService.getItem$(STORAGE_USER)
          .pipe(take(1))
          .subscribe((data: StorageUser) => {
            data.privateKey = this.privateKey;
            this.stateService.setItem(STORAGE_USER, data);
            this.router.navigate(['/']);
          });
      }, (error) => {
        if (error && error.status === 400) {
          this.message = {
            type: 'error',
            text: this.asyncPipe.transform(this.translateService.get('common.error.invalid-private-key'))
          };
        } else {
          this.message = {
            type: 'error',
            text: this.asyncPipe.transform(this.translateService.get('common.error.no-internet-connection'))
          };
        }
        this.changeDetectorRef.detectChanges();
      });
  }

}
