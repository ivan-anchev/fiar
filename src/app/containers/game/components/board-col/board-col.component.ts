import { Component, OnInit, OnDestroy, AfterContentInit, HostBinding, ContentChildren, QueryList } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
import { Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'fiar-board-col',
  templateUrl: './board-col.component.html',
  styleUrls: ['./board-col.component.scss']
})
export class BoardColComponent implements OnInit, OnDestroy, AfterContentInit {

  @HostBinding('class') boardColClass = 'board-col';

  @ContentChildren(PieceComponent) pieces: QueryList<PieceComponent>;

  private _destroyed$ = new ReplaySubject<boolean>(1);

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.pieces.changes.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(change => console.log(change));
    // console.log(this.pieces);
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

}
