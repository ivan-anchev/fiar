import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RootComponent} from './root/root.component';


const rootRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'game',
        loadChildren: 'src/app/containers/game/game.module#GameModule'
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(rootRoutes)],
  exports: [ RouterModule ]
})
export class RootRoutingModule {}
