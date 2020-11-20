import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UsersApiService} from '../../services/public-api';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {
  CreatedUser,
  CreateUser,
  FileService,
  GenerateKeyPairResponse,
  KeyPair,
  Role,
  RolesApiService,
  User
} from '../../../shared';
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
  #user: User;

  // password change
  submittedPasswordChange: boolean = false;
  passwordChangeSuccessful: boolean = false;
  updatePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required])
  });

  // actions
  actionsResponse: { successful: boolean, message: string };

  constructor(private rolesApiService: RolesApiService,
              private usersApiService: UsersApiService,
              private activatedRoute: ActivatedRoute,
              private fileService: FileService,
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

  generateNewKeyPair(): void {
    this.usersApiService.generateNewKeyPair(this.#user.id)
      .pipe()
      .subscribe((response: GenerateKeyPairResponse) => {
        this._downloadKeyFile(response.keyPair);
        this.actionsResponse = {
          message: 'Das Schlüsselpaar wurde erfolgreich bereitgestellt und wird heruntergeladen',
          successful: true
        };
        this.changeDetectorRef.detectChanges();
      }, (error) => {
        this.actionsResponse = error.status ? {
          message: 'Beim Erzeugen des Schlüsselpaares ist ein Fehler aufgetreten.',
          successful: false
        } : {
          message: 'Es besteht derzeit keine Internet-Verbindung. Bitte versuchen Sie es später erneut.',
          successful: false
        };
        this.changeDetectorRef.detectChanges();
      });
  }

  downloadKeyFile(): void {
    const keyPair = {
      privateKey: this.updatedUser.privateKey,
      publicKey: this.updatedUser.publicKey
    };
    this._downloadKeyFile(keyPair);
  }

  _downloadKeyFile(keyPair: KeyPair): void {
    this.fileService.createFileForDownload(keyPair);
  }
}
