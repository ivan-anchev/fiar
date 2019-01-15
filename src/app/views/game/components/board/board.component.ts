import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  HostBinding,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import { Board, Win, PiecePosition } from '../../../../models/game';

@Component({
  selector: 'fiar-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  @Input() disabled: boolean;

  @Input() mapIdToIndex: (string) => number;

  @Input() forceWinner: string;

  @Output() columnClicked: EventEmitter<{ columnIndex: number }> = new EventEmitter();

  winningSequence: Array<PiecePosition>;

  winner: string;

  @HostBinding('class') boardClass = 'flc-game-board';

  constructor() { }

  @Input() set win(win: Win) {
    if (win) {
      const { winner, winningSequence } = win;
      this.winner = winner;
      this.winningSequence = winningSequence;
    }
  }

  isPieceInSequence(piecePosition: PiecePosition): boolean {
    if (!this.winner || !this.winningSequence) {
      return false;
    }

    const { i, j } = piecePosition;
    const findPiecePosition = this.winningSequence.find(pos => pos['i'] === i && pos['j'] === j);
    return !!findPiecePosition;
  }

  onColumnClick(columnIndex: number) {

    if (this.disabled) {
      return;
    }

    this.columnClicked.emit({ columnIndex });
  }

  ngOnInit() {
  }

}
