import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import {
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatRadioModule } from '@angular/material';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileEditorComponent
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
    HomeRoutingModule
  ]
})
export class HomeModule { }
