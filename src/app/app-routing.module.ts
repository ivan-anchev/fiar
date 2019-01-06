import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'docs',
    loadChildren: 'src/app/docs/docs.module#DocsModule'
  },
  {
    path: '',
    loadChildren: 'src/app/containers/root/root.module#RootModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
