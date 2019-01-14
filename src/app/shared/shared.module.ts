import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar/avatar.component';
import { AvatarGroupComponent } from './components/avatar-group/avatar-group.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';

@NgModule({
  declarations: [AvatarComponent, AvatarGroupComponent, StatusBarComponent],
  imports: [
    CommonModule
  ],
  exports: [AvatarComponent, AvatarGroupComponent, StatusBarComponent]
})
export class SharedModule { }
