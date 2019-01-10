import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectChannelUsers } from '../../../store';
import {
  selectBoard,
  selectPlayersReady,
  selectPlayersAll,
  selectPlayersTotal,
  selectCurrentPlayer
} from '../store';
import { StartGame } from '../store/actions/feature.actions';
import { User } from '../../../models/user';

@Component({
  selector: 'fiar-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playersReady$: Observable<boolean>;

  players$: Observable<Array<User>>;

  playersTotal$: Observable<number>;

  user$: Observable<User>;

  board$: Observable<any>;

  currentPlayer$: Observable<string>;

  constructor(private _store: Store<AppState>) {
    this.playersReady$ = this._store.select(selectPlayersReady);
    this.playersTotal$ = this._store.select(selectPlayersTotal);
    this.players$ = this._store.select(selectPlayersAll);
    this.board$ = this._store.select(selectBoard);
    this.currentPlayer$ = this._store.select(selectCurrentPlayer);
  }

  ngOnInit() {
    this._store.select(selectChannelUsers).subscribe((users) => {
      this._store.dispatch(new StartGame({ players: users }));
    });
  }
}
