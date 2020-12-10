import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {User} from '../../../shared';
import {BreadcrumbService, UsersApiService} from '../../../core';

@Component({
  selector: 'ts-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    AsyncPipe
  ]
})
export class UserListComponent implements OnInit {

  users: User[];
  show: boolean = false;

  constructor(private usersApiService: UsersApiService,
              private breadcrumbService: BreadcrumbService,
              private router: Router,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.usersApiService.getAllUsers().pipe(
      take(1)
    ).subscribe(users => {
      this.users = users;
      this.changeDetectorRef.detectChanges();
    });

    this.breadcrumbService.startBreadcrumb({
      text: this.asyncPipe.transform(this.translateService.get('user.title.user-list')),
      url: this.router.url
    });
    this.breadcrumbService.showBreadcrumb(true);
  }

  deleteUser(id: string): void {
    this.usersApiService.deleteUser(id)
      .pipe(take(1))
      .subscribe((response) => {
        console.log('result', response);
        const index = this.users.findIndex(user => user.id === id);
        if (index >= -1) {
          this.users.splice(index, 1);
        }
        this.changeDetectorRef.detectChanges();
      }, (error) => {
        console.log('error', error);
      });
  }

  onUserCreated(user: User): void {
    this.users.push(user);
  }

  toggle(): void {
    this.show = !this.show;
  }

}
