import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../../models/user';
import { AvatarTypes } from '../../../../models/enums/avatar.enums';

@Component({
  selector: 'fiar-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {

  @Input() user: User = {
    name: 'Test',
    avatar: 'man'
  };

  @Output() cancel = new EventEmitter<boolean>();

  @Output() submit = new EventEmitter<User>();

  form: FormGroup;

  avatarTypes: Array<string>;

  constructor() {
    this.avatarTypes = Object.values(AvatarTypes);
  }

  onSubmit() {
    this.submit.next(this.form.value);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.user.name),
      avatar: new FormControl(this.user.avatar)
    });
  }

}
