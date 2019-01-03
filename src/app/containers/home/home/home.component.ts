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

  isConnected$: Observable<boolean>;

  isSessionCheckReady$: Observable<boolean>;

  isProfileEditMode$: Observable<boolean>;

  user$: Observable<User>;

  constructor(private _store: Store<AppState>) {
    this.isSessionCheckReady$ = this._store.select(selectIsSessionChecked);
    this.isConnected$ = this._store.select(selectIsConnected);
    this.user$ = this._store.select(selectUser);
    this.isProfileEditMode$ = this._store.select(selectIsProfileEditMode);
  }

  setProfileEditMode(isProfileEditMode: boolean) {
    this._store.dispatch(new SetProfileEditMode({ isProfileEditMode }));
  }

  onProfileSubmit(userData: User) {
    this._store.dispatch(new SetUser(userData));
    this._store.dispatch(new SetProfileEditMode({ isProfileEditMode: false }));
  }

  ngOnInit() {
    // this._store.dispatch(new Connect({ name: 'George '}));
    this._store.dispatch(new CheckSession);
  }
}
