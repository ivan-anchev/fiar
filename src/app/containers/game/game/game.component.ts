import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState, selectUser } from '../../../store';
import { selectPlayersReady, selectPlayersAll, selectPlayersTotal } from '../store';
import { Add } from '../store/actions/player.actions';
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

  pieces = [0];

  constructor(private _store: Store<AppState>) {
    this.playersReady$ = this._store.select(selectPlayersReady);
    this.playersTotal$ = this._store.select(selectPlayersTotal);
    this.players$ = this._store.select(selectPlayersAll);
  }

  test() {
    this.pieces.unshift(1);
  }

  ngOnInit() {
    // Add current user to players
    this._store.select(selectUser).pipe(
      take(1)
    ).subscribe(player => this._store.dispatch(new Add({ player: { ...player, isCurrent: true } })));
  }
}
