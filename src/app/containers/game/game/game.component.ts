import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectUser } from '../../../store';
import { GameFeatureState, selectGameFeature, selectPlayerState, selectPlayersTotal } from '../store';
import { Add } from '../store/actions/player.actions';

@Component({
  selector: 'fiar-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  totalPlayers$: Observable<any>;

  constructor(private _store: Store<AppState>) {
  }

  ngOnInit() {
    // Add user to players
    this._store.select(selectUser)
      .subscribe(player => this._store.dispatch(new Add({ player })));
    this.totalPlayers$ = this._store.select(selectPlayersTotal);
  }

}
