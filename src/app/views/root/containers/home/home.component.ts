import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as uuid from 'uuid/v4';
import { Observable, ReplaySubject } from 'rxjs';
import { tap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { User } from '../../../../models/user';
import { AppState } from '../../../../store';
import { JoinChannel, CreateChannel, WaitForChannel, LeaveChannel, Reset } from '../../../../store/actions/ws.actions';
import { SetProfileEditMode } from '../../../../store/actions/ui.actions';
import { SetUser } from '../../../../store/actions/user.actions';
import {
  selectOpenChannels,
  selectUser,
  selectIsProfileEditMode,
  selectIsWaitingForPlayer,
  selectIsWaitingForChannel,
  selectIsConnecting } from '../../../../store';

@Component({
  selector: 'fiar-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  /**
   * Is UI in profile edit mode
   */
  isProfileEditMode$: Observable<boolean>;

  /**
   * Current user obs
   */
  user$: Observable<User>;

  /**
   * Channel created, is waiting for player to join
   */
  isWaitingForPlayer$: Observable<boolean>;

  /**
   * Is searching for game with no open channels
   */
  isWaitingForChannel$: Observable<boolean>;

  /**
   * Is client trying to connect to WS
   */
  isConnecting$: Observable<boolean>;

  /**
   * Current user object
   */

  user: User;

  /**
   * WS Open channels
   */
  private openChannels: Array<string> = [];

  /**
   * Is component destroyed
   */
  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private _store: Store<AppState>) {
    this.user$ = this._store.pipe(
      select(selectUser),
      tap(user => this.user = user)
    );
    this.isProfileEditMode$ = this._store.pipe(
      select(selectIsProfileEditMode)
    );
    this.isConnecting$ = this._store.pipe(
      select(selectIsConnecting)
    );
    this.isWaitingForPlayer$ = this._store.pipe(
      select(selectIsWaitingForPlayer)
    );
    this.isWaitingForChannel$ = this._store.pipe(
      select(selectIsWaitingForChannel)
    );
    this._store.pipe(
      select(selectOpenChannels),
      withLatestFrom(
        this.isWaitingForChannel$,
        (openChannels, isWaitingForChannel) => ({ openChannels, isWaitingForChannel })
      ),
      takeUntil(this._destroyed$)
    ).subscribe(({ openChannels, isWaitingForChannel }) => {
      this.openChannels = openChannels;
      if (isWaitingForChannel && openChannels.length) {
        this.joinGame();
      }
    });
  }

  startGame() {
    const channelName = uuid();
    const host = this.user.id;
    this._store.dispatch(new CreateChannel({ channelName, host }));
  }

  joinGame() {
    const channelName = this.openChannels[0];
    if (channelName) {
      this._store.dispatch(new JoinChannel({ channelName }));
    } else {
      this._store.dispatch(new WaitForChannel({ waitingForChannel: true }));
    }

  }

  /**
   * Set profile edit mode for UI
   * @param  isProfileEditMode boolean
   */
  setProfileEditMode(isProfileEditMode: boolean) {
    this._store.dispatch(new SetProfileEditMode({ isProfileEditMode }));
  }

  /**
   * Set current user data after edit
   * @param  userData User
   */
  onProfileSubmit({ name, avatar }: User) {
    const { id } = this.user;
    this._store.dispatch(new SetUser({ id, name, avatar }));
    this._store.dispatch(new SetProfileEditMode({ isProfileEditMode: false }));
  }

  cancelChannelSearch() {
    this._store.dispatch(new WaitForChannel({ waitingForChannel: false }));
  }

  leaveChannel() {
    this._store.dispatch(new LeaveChannel);
  }

  ngOnInit() {
    this._store.dispatch(new Reset);
    this._store.dispatch(new LeaveChannel);
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
