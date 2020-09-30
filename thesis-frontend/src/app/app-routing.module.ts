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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
