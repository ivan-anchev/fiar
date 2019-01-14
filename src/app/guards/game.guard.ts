import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, selectChannel } from '../store';
import { Observable } from 'rxjs';
import { Channel } from '../models/channel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {

  constructor(
    private _store: Store<AppState>,
    private _router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this._store.pipe(
      select(selectChannel),
      map((channel: Channel) => {
        let canActivate = false;

        if (channel) {
          const { users } = channel;
          canActivate = users.size === 2;
        }

        if (!canActivate) {
          this._router.navigate(['/home']);
        }
        return canActivate;
      })
    );
  }
}
