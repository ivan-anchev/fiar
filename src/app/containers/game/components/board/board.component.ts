import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'fiar-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  @HostBinding('class') boardClass = 'flc-game-board';

  ngOnInit() {
  }

}
