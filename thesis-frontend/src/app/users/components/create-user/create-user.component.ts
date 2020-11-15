import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreatedUser, CreateUser, Role} from '../../../shared';
import {UsersApiService} from '../../services/public-api';
import {RolesApiService} from '../../../shared/services/roles-api.service';

@Component({
  selector: 'ts-create-user',
  templateUrl: 'create-user.component.html',
  styleUrls: ['create-user.component.html'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
    roles: new FormControl(null, [Validators.required])
  });

  roles: Role[];
  submitted: boolean = false;
  createdSuccessful: boolean = false;
  createdUser: CreatedUser;
  createdFailure: boolean = false;

  constructor(private rolesApiService: RolesApiService,
              private usersApiService: UsersApiService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.roles = [];
  }

  ngOnInit() {
    this.rolesApiService.getAllRoles().subscribe(roles => {
      this.roles = roles;
      this.changeDetectorRef.detectChanges();
    }, () => {
      this.roles = [];
      this.changeDetectorRef.detectChanges();
    });
  }

  createUser(): void {
    this.submitted = true;
    if (this.createUserForm.valid) {
      const createUser: CreateUser = {
        password: this.getFormControl('password').value,
        username: this.getFormControl('username').value,
        roles: [this.getFormControl('roles').value]
      };

      this.usersApiService.createUser(createUser)
        .pipe()
        .subscribe((createdUser: CreatedUser) => {
          this.createdSuccessful = true;
          this.createUserForm.reset({
            username: null,
            password: null,
            passwordRepeat: null,
          });
          this.submitted = false;
          this.createdFailure = false;
          this.createdUser = createdUser;
          this.changeDetectorRef.detectChanges();
        }, () => {
          this.createdFailure = true;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  getFormControl(key: string): AbstractControl {
    return this.createUserForm.get(key);
  }

  downloadKeyFile(): void {
    const keyPair = {
      privateKey: this.createdUser.privateKey,
      publicKey: this.createdUser.publicKey
    };
    const blob = new Blob([JSON.stringify(keyPair, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

}
