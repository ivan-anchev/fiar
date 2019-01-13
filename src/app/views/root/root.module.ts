import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootRoutingModule } from './root-routing.module';
import {
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatRadioModule } from '@angular/material';

import { HomeComponent } from './containers/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { RootComponent } from './containers/root/root.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileEditorComponent,
    RootComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    RootRoutingModule
  ]
})
export class RootModule { }
