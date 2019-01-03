import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { AppState } from '../../../store';
import { Connect } from '../../../store/actions/ws.actions';
import { SetProfileEditMode } from '../../../store/actions/ui.actions';
import { CheckSession, SetUser } from '../../../store/actions/user.actions';
import { selectIsConnected, selectIsSessionChecked, selectUser, selectIsProfileEditMode } from '../../../store';

@Component({
  selector: 'fiar-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Is user connected to WS
   */
  isConnected$: Observable<boolean>;

  /**
   * Is session check ready
   */
  isSessionCheckReady$: Observable<boolean>;

  /**
   * Is UI in profile edit mode
   */
  isProfileEditMode$: Observable<boolean>;

  /**
   * Current user object
   */
  user$: Observable<User>;

  constructor(private _store: Store<AppState>) {
    this.isSessionCheckReady$ = this._store.select(selectIsSessionChecked);
    this.isConnected$ = this._store.select(selectIsConnected);
    this.user$ = this._store.select(selectUser);
    this.isProfileEditMode$ = this._store.select(selectIsProfileEditMode);
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
    this._store.dispatch(new SetUser({ name, avatar }));
    this._store.dispatch(new SetProfileEditMode({ isProfileEditMode: false }));
  }

  ngOnInit() {
    // this._store.dispatch(new Connect({ name: 'George '}));
    this._store.dispatch(new CheckSession);
  }
}
