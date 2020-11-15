import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UsersApiService} from '../../services/public-api';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {User} from '../../../shared';

@Component({
  selector: 'ts-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {

  constructor(private usersApiService: UsersApiService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log('id', params.get('id'));
      const id = params.get('id');
      this.usersApiService.getUserById(id).pipe(
        take(1)
      ).subscribe((user: User) => {
        console.log('got user', user);
      });
    });
  }
}
