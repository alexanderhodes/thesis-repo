import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {comparePasswordsValidator, CreatedUser, CreateUser, FileService, Role} from '../../../shared';
import {RolesApiService, UsersApiService} from '../../../core/http';

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
  }, { validators: [comparePasswordsValidator] });

  roles: Role[];
  submitted: boolean = false;
  createdSuccessful: boolean = false;
  createdUser: CreatedUser;
  createdFailure: boolean = false;

  constructor(private rolesApiService: RolesApiService,
              private usersApiService: UsersApiService,
              private fileService: FileService,
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
    this.fileService.createFileForDownload(keyPair);
  }

}
