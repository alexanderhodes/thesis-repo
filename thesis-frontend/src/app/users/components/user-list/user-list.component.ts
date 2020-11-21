import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UsersApiService} from '../../services/public-api';
import {take} from 'rxjs/operators';
import {User} from '../../../shared';

@Component({
  selector: 'ts-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private usersApiService: UsersApiService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.usersApiService.getAllUsers().pipe(
      take(1)
    ).subscribe(users => {
      this.users = users;
      this.changeDetectorRef.detectChanges();
    });
  }

}
