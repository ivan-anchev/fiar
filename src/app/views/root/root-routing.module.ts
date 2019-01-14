import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { RootComponent} from './containers/root/root.component';
import { GameGuard } from '../../guards/game.guard';

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
        loadChildren: 'src/app/views/game/game.module#GameModule',
        canActivate: [GameGuard]
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(rootRoutes)],
  exports: [ RouterModule ]
})
export class RootRoutingModule {}
