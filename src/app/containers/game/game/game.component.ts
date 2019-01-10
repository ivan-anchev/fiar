import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectChannelUsers } from '../../../store';
import {
  selectBoard,
  selectPlayersAll,
  selectPlayersTotal,
  selectCurrentPlayer,
  selectIsPlayersTurn
} from '../store';
import { StartGame } from '../store/actions/feature.actions';
import { User } from '../../../models/user';

@Component({
  selector: 'fiar-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  players$: Observable<Array<User>>;

  playersTotal$: Observable<number>;

  user$: Observable<User>;

  board$: Observable<any>;

  currentPlayer$: Observable<string>;

  isPlayersTurn$: Observable<(id: string) => boolean>;

  constructor(private _store: Store<AppState>) {
    this.playersTotal$ = this._store.select(selectPlayersTotal);
    this.players$ = this._store.select(selectPlayersAll);
    this.board$ = this._store.select(selectBoard);
    this.currentPlayer$ = this._store.select(selectCurrentPlayer);
    this.isPlayersTurn$ = this._store.pipe(
      select(selectIsPlayersTurn)
    );
  }

  ngOnInit() {
    this._store.select(selectChannelUsers).subscribe((users) => {
      this._store.dispatch(new StartGame({ players: users }));
    });
  }
}
