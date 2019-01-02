import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../../../store';
import { HomeComponent } from './home.component';
import { CoreModule } from '../../../core/core.module';
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        MatInputModule,
        CoreModule
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
