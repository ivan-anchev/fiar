import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectIsConnecting } from '../../../../store';
import { CheckSession } from '../../../../store/actions/user.actions';

@Component({
  selector: 'fiar-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  isConnecting$: Observable<boolean>;

  constructor(private _store: Store<AppState>) {
    this.isConnecting$ = _store.pipe(
      select(selectIsConnecting)
    );
  }

  ngOnInit() {
    this._store.dispatch(new CheckSession);
  }
}
