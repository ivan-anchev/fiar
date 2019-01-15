import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Board, Win } from '../../../../models/game';
import {
  AppState,
  selectChannelUsers
} from '../../../../store';

import {
  selectBoard,
  selectPlayersAll,
  selectIsPlayersTurn,
  selectIsPlayerWinning,
  selectWinnerBySurrender,
  selectStatusMessage,
  selectPlayerIds,
  selectClient,
  selectWin
} from '../../store';

import { StartGame } from '../../store/actions/feature.actions';
import { PlacePiece, EndGame, Surrender, SetWinner } from '../../store/actions/game.actions';
import { User } from '../../../../models/user';

@Component({
  selector: 'fiar-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  players$: Observable<Array<User>>;

  playerIds: string[];

  board$: Observable<Board>;

  win$: Observable<Win>;

  winnerBySurrender$: Observable<string>;

  isPlayersTurn$: Observable<(id: string) => boolean>;

  isPlayersWinning$: Observable<(id: string) => boolean>;

  statusMessage$: Observable<string>;

  user$: Observable<User>;

  userObj: User;

  _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  mapPlayerToIndexFn: Function;

  constructor(private _store: Store<AppState>) {
    this.players$ = this._store.pipe(
      select(selectPlayersAll)
    );

    this.win$ = this._store.pipe(
      select(selectWin)
    );

    this.winnerBySurrender$ = this._store.pipe(
      select(selectWinnerBySurrender)
    );

    this.user$ = this._store.pipe(
      select(selectClient),
      tap(user => this.userObj = user)
    );

    this.board$ = this._store.pipe(
      select(selectBoard)
    );

    this.isPlayersTurn$ = this._store.pipe(
      select(selectIsPlayersTurn)
    );

    this.isPlayersWinning$ = this._store.pipe(
      select(selectIsPlayerWinning)
    );

    this.statusMessage$ = this._store.pipe(
      select(selectStatusMessage)
    );

    this._store.pipe(
      select(selectPlayerIds),
      takeUntil(this._destroyed$),
    ).subscribe(ids => this.playerIds = <string[]>ids);

    this.mapPlayerToIndexFn = this.mapPlayerToIndex.bind(this);
  }

  mapPlayerToIndex(playerId: string): number {
    return this.playerIds.indexOf(playerId);
  }

  placePiece({ columnIndex }) {
    const playerId = this.userObj.id;
    this._store.dispatch(new PlacePiece({ playerId, columnIndex }));
  }

  surrender() {
    const playerId = this.userObj.id;
    this._store.dispatch(new Surrender({ playerId }));
  }

  exit() {
    this._store.dispatch(new EndGame);
  }

  ngOnInit() {
    this._store.select(selectChannelUsers).subscribe((users) => {
      this._store.dispatch(new StartGame({ players: users }));
    });
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
