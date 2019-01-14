import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'fiar-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  @Input() animate = false;

  @HostBinding('class') statusBarClass = 'status-bar-container';

  constructor() { }

  ngOnInit() {
  }

}
