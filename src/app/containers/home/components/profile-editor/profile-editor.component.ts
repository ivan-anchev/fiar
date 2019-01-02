import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../../models/user';

@Component({
  selector: 'fiar-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {

  @Input() user: User;

  form: FormGroup;

  @Output() cancel = new EventEmitter<boolean>();

  @Output() submit = new EventEmitter<User>();

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(''),
      avatar: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  ngOnInit() {
  }

}
