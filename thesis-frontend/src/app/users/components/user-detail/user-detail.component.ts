import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UsersApiService} from '../../services/public-api';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {CreatedUser, CreateUser, Role, User} from '../../../shared';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesApiService} from '../../../shared/services/roles-api.service';

@Component({
  selector: 'ts-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {

  updateUserForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
    roles: new FormControl(null, [Validators.required])
  });

  roles: Role[];
  submitted: boolean = false;
  updatedSuccessful: boolean = false;
  updatedUser: CreatedUser;
  updateFailure: boolean = false;

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
        this.updateUserForm.setValue({
          username: user.username,
          password: '',
          passwordRepeat: '',
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
        password: this.getFormControl('password').value,
        username: this.getFormControl('username').value,
        roles: [this.getFormControl('roles').value]
      };

      this.usersApiService.createUser(createUser)
        .pipe()
        .subscribe((createdUser: CreatedUser) => {
          this.updatedSuccessful = true;
          this.updateUserForm.reset({
            username: null,
            password: null,
            passwordRepeat: null,
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

  getFormControl(key: string): AbstractControl {
    return this.updateUserForm.get(key);
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
