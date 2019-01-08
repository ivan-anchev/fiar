import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';
import { GameFeatureEffects } from './store/effects/feature.effects';
import {
  MatCardModule,
  MatProgressBarModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';

import { PlayerEffects } from './store/effects/player.effects';
import { BoardComponent } from './components/board/board.component';
import { BoardColComponent } from './components/board-col/board-col.component';
import { PieceComponent } from './components/piece/piece.component';
@NgModule({
  declarations: [GameComponent, BoardComponent, BoardColComponent, PieceComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    SharedModule,
    StoreModule.forFeature('gameFeature', reducers),
    EffectsModule.forFeature([PlayerEffects, GameFeatureEffects]),
    GameRoutingModule
  ]
})
export class GameModule { }
