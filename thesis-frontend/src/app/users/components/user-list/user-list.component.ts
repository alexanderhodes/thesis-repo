import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {take} from 'rxjs/operators';
import {User} from '../../../shared';
import {UsersApiService} from '../../../core';

@Component({
  selector: 'ts-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class UserListComponent implements OnInit {

  users: User[];
  show: boolean = false;

  constructor(private usersApiService: UsersApiService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.usersApiService.getAllUsers().pipe(
      take(1)
    ).subscribe(users => {
      this.users = users;
      this.changeDetectorRef.detectChanges();
    });
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
