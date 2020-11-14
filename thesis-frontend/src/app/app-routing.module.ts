import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./neo4j').then(m => m.Neo4jModule),
  },
  {
    path: 'cols',
    loadChildren: () => import('./col').then(m => m.ColModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
