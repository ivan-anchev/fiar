import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AvatarTypes, AvatarStates } from '../../../models/avatar.enums';

@Component({
  selector: 'fiar-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {

  @Input() type: AvatarTypes;

  @Input() state: AvatarStates;

  @Input() isActive: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      const type = changes['type'].currentValue;
      if (type !== AvatarTypes.Woman && type !== AvatarTypes.Man) {
        throw new Error('Invalid Type input value');
      }
    }
  }

}
