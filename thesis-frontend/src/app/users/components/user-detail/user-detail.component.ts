import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UsersApiService} from '../../services/public-api';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {CreatedUser, CreateUser, Role, RolesApiService, User} from '../../../shared';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ts-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {

  // user change
  roles: Role[];
  submitted: boolean = false;
  updatedSuccessful: boolean = false;
  updatedUser: CreatedUser;
  updateFailure: boolean = false;
  updateUserForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    roles: new FormControl(null, [Validators.required])
  });

  // password change
  submittedPasswordChange: boolean = false;
  passwordChangeSuccessful: boolean = false;
  updatePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required])
  });

  #user: User;

  constructor(private rolesApiService: RolesApiService,
              private usersApiService: UsersApiService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log('id', params.get('id'));
      const id = params.get('id');
      this.usersApiService.getUserById(id).pipe(
        take(1)
      ).subscribe((user: User) => {
        this.#user = user;
        this.updateUserForm.setValue({
          username: user.username,
          roles: user.roles[0]
        });
        console.log('got user', user);
      });
    });

    this.rolesApiService.getAllRoles().subscribe(roles => {
      this.roles = roles;
      this.changeDetectorRef.detectChanges();
    }, () => {
      this.roles = [];
      this.changeDetectorRef.detectChanges();
    });
  }

  updateUser(): void {
    this.submitted = true;
    if (this.updateUserForm.valid) {
      const createUser: CreateUser = {
        password: this.getFormControlForUpdateUser('password').value,
        username: this.getFormControlForUpdateUser('username').value,
        roles: [this.getFormControlForUpdateUser('roles').value]
      };

      this.usersApiService.createUser(createUser)
        .pipe()
        .subscribe((createdUser: CreatedUser) => {
          this.updatedSuccessful = true;
          this.updateUserForm.reset({
            username: null
          });
          this.submitted = false;
          this.updateFailure = false;
          this.updatedUser = createdUser;
          this.changeDetectorRef.detectChanges();
        }, () => {
          this.updateFailure = true;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  changePassword(): void {
    this.submittedPasswordChange = true;
    this.passwordChangeSuccessful = false;

    if (this.updatePasswordForm) {
      this.usersApiService.updatePassword({
        user: this.#user.id,
        password: this.getFormControlForUpdatePassword('password').value
      }).pipe()
        .subscribe((response) => {
          this.updatePasswordForm.reset({
            password: '',
            passwordRepeat: ''
          });
          this.submittedPasswordChange = false;
          this.passwordChangeSuccessful = true;
          this.changeDetectorRef.detectChanges();
        }, (error) => {
          console.log('error on update');
          this.submittedPasswordChange = true;
          this.passwordChangeSuccessful = false;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  getFormControlForUpdateUser(key: string): AbstractControl {
    return this.updateUserForm.get(key);
  }

  getFormControlForUpdatePassword(key: string): AbstractControl {
    return this.updatePasswordForm.get(key);
  }

  downloadKeyFile(): void {
    const keyPair = {
      privateKey: this.updatedUser.privateKey,
      publicKey: this.updatedUser.publicKey
    };
    const blob = new Blob([JSON.stringify(keyPair, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }
}
