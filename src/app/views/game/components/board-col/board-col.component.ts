import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'fiar-board-col',
  templateUrl: './board-col.component.html',
  styleUrls: ['./board-col.component.scss']
})
export class BoardColComponent implements OnInit {

  @HostBinding('class') boardColClass = 'board-col';

  @HostBinding('class.disabled') get disabledClass() {
    return this.disabled;
  }

  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }
}
