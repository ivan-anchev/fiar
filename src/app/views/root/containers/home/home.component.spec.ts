import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../../../store';
import { HomeComponent } from './home.component';
import { ProfileEditorComponent } from '../components/profile-editor/profile-editor.component';
import { CoreModule } from '../../../core/core.module';
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatRadioModule,
  MatInputModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,
        SharedModule,
        MatListModule,
        MatIconModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        MatInputModule,
        CoreModule
      ],
      declarations: [ HomeComponent, ProfileEditorComponent ]
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
