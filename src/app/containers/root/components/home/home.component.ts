import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as uuid from 'uuid/v4';
import { Observable, ReplaySubject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { User } from '../../../../models/user';
import { AppState } from '../../../../store';
import { JoinChannel, CreateChannel} from '../../../../store/actions/ws.actions';
import { SetProfileEditMode } from '../../../../store/actions/ui.actions';
import { SetUser } from '../../../../store/actions/user.actions';
import {
  selectOpenChannels,
  selectUser,
  selectIsProfileEditMode } from '../../../../store';

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
   * Current user object
   */

  user: User;

  /**
   * WS Open channels
   */
  private openChannels: Array<string>;

  /**
   * Is component destroyed
   */
  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private _store: Store<AppState>) {
    this.user$ = this._store.select(selectUser).pipe(
      tap(user => this.user = user)
    );
    this.isProfileEditMode$ = this._store.select(selectIsProfileEditMode);
    this._store.select(selectOpenChannels).pipe(
      takeUntil(this._destroyed$)
    ).subscribe(openChannels => this.openChannels = openChannels);
  }

  startGame() {
    const channelName = uuid();
    const host = this.user.id;
    this._store.dispatch(new CreateChannel({ channelName, host }));
  }

  joinGame() {
    const channelName = this.openChannels[0];
    this._store.dispatch(new JoinChannel({ channelName }));
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

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
