import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models/user';
import { UserActionTypes, CheckSessionSuccess, SetUser } from '../actions/user.actions';
import { Connect } from '../actions/ws.actions';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  constructor(
    private userService: UserService,
    private actions: Actions
  ) { }

  @Effect()
  checkSession$: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.CHECK_SESSION),
    switchMap(() =>
      of(this.userService.getCurrent()).pipe(
        map(user => new CheckSessionSuccess({ ...user }))
      )
    )
  );

  @Effect({ dispatch: false })
  setUser$: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.SET_USER),
    map((action: SetUser ) => action.payload),
    tap(({ name, avatar }: User) => this.userService.saveCurrent({ name, avatar }))
  );

  @Effect()
  connect$: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.SET_USER, UserActionTypes.CHECK_SESSION_SUCCESS),
    switchMap(action => of(new Connect({ ...(<any>action).payload })))
  );
}
