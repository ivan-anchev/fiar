import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { UserActionTypes, CheckSessionSuccess } from '../actions/user.actions';

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
}
