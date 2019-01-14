import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'fiar-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @Input() playerIndex: number;

  @Input() isWinning: boolean;

  constructor() { }

  @HostBinding('class') pieceClass = 'flc-game-piece';

  @HostBinding('class.player-one') get isPlayerOne() {
    return this.playerIndex === 0;
  }

  @HostBinding('class.player-two') get isPlayerTwo() {
    return this.playerIndex === 1;
  }

  @HostBinding('class.winner') get isWinner() {
    return this.isWinning;
  }

  ngOnInit() {
  }

}
