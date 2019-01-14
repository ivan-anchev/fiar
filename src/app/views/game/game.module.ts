import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './containers/game/game.component';
import { GameFeatureEffects } from './store/effects/feature.effects';
import { GameEffects } from './store/effects/game.effects';

import {
  MatCardModule,
  MatProgressBarModule,
  MatButtonModule,
  MatDividerModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';

import { PlayerEffects } from './store/effects/player.effects';
import { BoardComponent } from './components/board/board.component';
import { BoardColComponent } from './components/board-col/board-col.component';
import { PieceComponent } from './components/piece/piece.component';
import { HudComponent } from './components/hud/hud.component';
@NgModule({
  declarations: [GameComponent, BoardComponent, BoardColComponent, PieceComponent, HudComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    SharedModule,
    StoreModule.forFeature('gameFeature', reducers),
    EffectsModule.forFeature([GameEffects, PlayerEffects, GameFeatureEffects]),
    GameRoutingModule
  ]
})
export class GameModule { }
