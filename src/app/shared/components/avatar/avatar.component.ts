import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fiar-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {

  @Input() type: AvatarTypes;

  @Input() state: AvatarStates;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type'] !== null) {
      const type = changes['type'].currentValue;
      if (type !== AvatarTypes.Woman && type !== AvatarTypes.Man) {
        throw new Error('Invalid Type input value');
      }
    }
  }

}

export enum AvatarTypes {
  Woman = 'woman',
  Man = 'man'
}

export enum AvatarStates {
  Winning = 'winning',
  TheirTurn  = 'their-turn'
}
