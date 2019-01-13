import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './containers/game/game.component';

const gameRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(gameRoutes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
