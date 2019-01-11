import { ChangeDetectionStrategy, Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fiar-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  @Input() board: Array<Array<string>>;

  @Input() disabled: boolean;

  @Output() columnClicked: EventEmitter<number> = new EventEmitter();

  @HostBinding('class') boardClass = 'flc-game-board';

  constructor() { }

  ngOnInit() {
  }

  onColumnClick(columnIndex: number) {

    if (this.disabled) {
      return;
    }

    this.columnClicked.emit(columnIndex);
  }
}
