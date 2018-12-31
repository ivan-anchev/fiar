import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store';
import { Connect } from '../../../store/actions/ws.actions';
import { selectIsConnected } from '../../../store';

@Component({
  selector: 'fiar-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isConnected$: Observable<boolean>;

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.dispatch(new Connect({ name: 'George '}));
    this.isConnected$ = this._store.select(selectIsConnected);
  }
}
