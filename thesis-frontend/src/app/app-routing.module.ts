import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionsEnum} from './core/enums';
import {PermissionRouteGuard} from './core/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login').then(m => m.LoginModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users').then(m => m.UsersModule),
    canActivate: [PermissionRouteGuard],
    data: {
      roles: [],
      permissions: [PermissionsEnum.USER_READ]
    }
  },
  {
    path: 'occupations',
    loadChildren: () => import('./occupations').then(m => m.OccupationsModule),
    canActivate: [PermissionRouteGuard],
    data: {
      roles: [],
      permissions: [PermissionsEnum.ASSETS_READ]
    }
  },
  {
    path: 'qualifications',
    loadChildren: () => import('./qualifications').then(m => m.QualificationsModule),
    canActivate: [PermissionRouteGuard],
    data: {
      roles: [],
      permissions: [PermissionsEnum.ASSETS_READ]
    }
  },
  {
    path: 'configuration',
    loadChildren: () => import('./configuration').then(m => m.ConfigurationModule),
    canActivate: [PermissionRouteGuard],
    data: {
      roles: ['ADMINISTRATOR', 'GREMIUM'],
      permissions: [PermissionsEnum.CONFIGURATION_CREATE, PermissionsEnum.CONFIGURATION_READ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
