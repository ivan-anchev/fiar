import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import {
  AppState,
  selectChannelUsers
} from '../../../../store';

import {
  selectBoard,
  selectPlayersAll,
  selectIsPlayersTurn,
  selectPlayerIds,
  selectClient
} from '../../store';

import { StartGame } from '../../store/actions/feature.actions';
import { PlacePiece } from '../../store/actions/game.actions';
import { User } from '../../../../models/user';

@Component({
  selector: 'fiar-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  players$: Observable<Array<User>>;

  playerIds: string[];

  board$: Observable<any>;

  isPlayersTurn$: Observable<(id: string) => boolean>;

  user$: Observable<User>;

  userObj: User;

  _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  mapPlayerToIndexFn: Function;

  test;

  constructor(private _store: Store<AppState>) {
    this.players$ = this._store.pipe(
      select(selectPlayersAll)
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
