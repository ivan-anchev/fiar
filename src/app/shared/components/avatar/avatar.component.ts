import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AvatarTypes, AvatarStates } from '../../../models/enums/avatar.enums';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'fiar-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  animations: [
  trigger('fade', [
    state('in', style({opacity: 1})),
    state('out', style({opacity: 0})),
    transition('in => out', animate('1.5s linear')),
    transition('out => in', animate('1.5s linear'))
  ]),
  ]
})
export class AvatarComponent implements OnInit, OnChanges {

  @Input() type: AvatarTypes;

  @Input() index: number;

  @Input() state: AvatarStates;

  @Input() isActive: boolean;

  animationState = 'in';

  constructor() { }

  ngOnInit() {
  }

  onAnimationEnd() {
    if (this.animationState === 'in') {
      this.animationState = 'out';
    } else {
      this.animationState = 'in';
    }
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
