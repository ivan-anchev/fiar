import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('gameFeature', reducers),
    GameRoutingModule
  ]
})
export class GameModule { }
