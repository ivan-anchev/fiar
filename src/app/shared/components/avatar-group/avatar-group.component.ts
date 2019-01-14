import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'fiar-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss']
})
export class AvatarGroupComponent implements OnInit {

  @HostBinding('class') groupClass = 'flc-game-avatar-group';

  constructor() { }

  ngOnInit() {
  }

}
