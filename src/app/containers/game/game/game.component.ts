import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  AppState,
  selectChannelUsers
 } from '../../../store';

import {
  selectBoard,
  selectPlayersAll,
  selectIsPlayersTurn,
  selectClient
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

  board$: Observable<any>;

  isPlayersTurn$: Observable<(id: string) => boolean>;

  user$: Observable<User>;

  constructor(private _store: Store<AppState>) {

    this.players$ = this._store.pipe(
      select(selectPlayersAll)
    );

    this.user$ = this._store.pipe(
      select(selectClient)
    );

    this.board$ = this._store.pipe(
      select(selectBoard)
    );

    this.isPlayersTurn$ = this._store.pipe(
      select(selectIsPlayersTurn)
    );
  }

  placePiece(columnIndex: number) {

  }

  ngOnInit() {
    this._store.select(selectChannelUsers).subscribe((users) => {
      this._store.dispatch(new StartGame({ players: users }));
    });
  }
}
