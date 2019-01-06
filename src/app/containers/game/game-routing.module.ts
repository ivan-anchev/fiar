import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from '@angular/router';
import { GameComponent } from './game/game.component';

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
