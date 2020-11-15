import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreatedUser, CreateUser, Permission, PermissionsApiService} from '../../../shared';
import {UsersApiService} from '../../services/public-api';

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
    permission: new FormControl(null, [Validators.required])
  });

  permissions: Permission[];
  selectedPermissions: Permission[];
  submitted: boolean = false;
  createdSuccessful: boolean = false;
  createdUser: CreatedUser;
  createdFailure: boolean = false;

  constructor(private permissionsApiService: PermissionsApiService,
              private usersApiService: UsersApiService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.permissions = [];
    this.selectedPermissions = [];
  }

  ngOnInit() {
    this.permissionsApiService.getPermissions().subscribe(permissions => {
      this.permissions = permissions;
      this.changeDetectorRef.detectChanges();
    }, () => {
      this.permissions = [];
      this.changeDetectorRef.detectChanges();
    });
  }

  createUser(): void {
    this.submitted = true;
    if (this.createUserForm.valid) {
      const createUser: CreateUser = {
        password: this.getFormControl('password').value,
        username: this.getFormControl('username').value,
        roles: []
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

  selectPermission(): void {
    console.log('selected permission', this.getFormControl('permission').value);
  }

}
