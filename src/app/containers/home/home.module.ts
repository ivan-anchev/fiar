import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatProgressSpinnerModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
