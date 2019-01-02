import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AvatarComponent, AvatarTypes, AvatarStates } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() type', () => {
    Object.keys(AvatarTypes).forEach(type => {
      const value = AvatarTypes[type];
      it(`should have class ${value} avatar when input is ${value}`, () => {
        component.type = value;
        fixture.detectChanges();
        const el = de.query(By.css('.flc-game-avatar'));
        expect(el.classes[value]).toBeTruthy();
      });
    });

    it('should have default avatar class MAN', () => {
      const el = de.query(By.css('.flc-game-avatar'));
      expect(el.classes['man']).toBeTruthy();
    });
  });

  describe('@Input() state', () => {
    it('should have no state class when there is no input', () => {
      component.state = null;
      fixture.detectChanges();
      const el = de.query(By.css('.flc-game-avatar'));
      const { classes } = el;
      expect(!classes['their-turn'] && !classes['winning']).toBeTruthy();
    });

    Object.keys(AvatarStates).forEach(state => {
      it(`should have class ${AvatarStates[state]} when input is ${AvatarStates[state]}`, () => {
        const value = AvatarStates[state];
        component.state = value;
        fixture.detectChanges();
        const el = de.query(By.css('.flc-game-avatar'));
        const { classes } = el;
        expect(classes[value]).toBeTruthy();
      });
    });
  });

  describe('ngOnChanges()', () => {
    it('should throw error when input type is invalid', () => {
      expect(() => {
        component.type = <any> 1;
        component.ngOnChanges({
          type: new SimpleChange(null, component.type, null)
        });
        fixture.detectChanges();
      }).toThrow(new Error('Invalid Type input value'));
    });
  });
});
