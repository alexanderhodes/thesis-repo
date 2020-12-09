import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionRouteGuard, PermissionsEnum, PrivateKeyGuard} from './core';

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
    canActivate: [PermissionRouteGuard, PrivateKeyGuard],
    data: {
      roles: [],
      permissions: [PermissionsEnum.USER_READ]
    }
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources').then(m => m.ResourcesModule),
    canActivate: [PermissionRouteGuard, PrivateKeyGuard],
    data: {
      roles: [],
      permissions: [PermissionsEnum.ASSETS_READ]
    }
  },
  {
    path: 'configuration',
    loadChildren: () => import('./configuration').then(m => m.ConfigurationModule),
    canActivate: [PermissionRouteGuard, PrivateKeyGuard],
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
export class AppRoutingModule {
}
