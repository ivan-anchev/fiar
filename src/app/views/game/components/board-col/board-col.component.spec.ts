import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardColComponent } from './board-col.component';

describe('BoardColComponent', () => {
  let component: BoardColComponent;
  let fixture: ComponentFixture<BoardColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
