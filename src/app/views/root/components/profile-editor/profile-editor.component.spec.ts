import {  async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatRadioModule } from '@angular/material';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProfileEditorComponent } from './profile-editor.component';

describe('ProfileEditorComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileEditorComponent,
        HostComponent ],
        imports: [
          CommonModule,
          SharedModule,
          NoopAnimationsModule,
          MatProgressSpinnerModule,
          MatIconModule,
          MatButtonModule,
          MatCardModule,
          MatInputModule,
          MatFormFieldModule,
          MatListModule,
          MatRadioModule,
          FormsModule,
          ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.debugElement.query(By.directive(ProfileEditorComponent))).toBeTruthy();
  });

  describe('when [user] is default', () => {
    it('should have active man avatar', () => {
      const profileEditorDe = fixture.debugElement.query(By.directive(ProfileEditorComponent));
      const avatarEl = profileEditorDe.query(By.css('.flc-game-avatar.man')).nativeElement;
      expect(avatarEl.classList).toContain('active');
    });

    it('should have empty name input value', () => {
      const profileEditorDe = fixture.debugElement.query(By.directive(ProfileEditorComponent));
      const inputEl = profileEditorDe.query(By.css('input[type="text"]'));
      expect(inputEl.nativeElement.value).toBe('');
    });
  });

  describe('when canceled', () => {
    it('should emit cancel event', fakeAsync(() => {
      spyOn(component, 'onCancel');
      const profileEditorDe = fixture.debugElement.query(By.directive(ProfileEditorComponent));
      const cancelButton = profileEditorDe.query(By.css('#cancel-btn'));
      cancelButton.triggerEventHandler('click', null);
      tick();
      expect(component.onCancel).toHaveBeenCalled();
    }));
  });

  describe('when submitted', () => {
    it('should emit submit event', fakeAsync(() => {
      spyOn(component, 'onSubmit');
      const profileEditorDe = fixture.debugElement.query(By.directive(ProfileEditorComponent));
      const submitButton = profileEditorDe.query(By.css('button[type="submit"]'));
      console.log(submitButton);
      submitButton.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(component.onSubmit).toHaveBeenCalledWith({
        name: '',
        avatar: 'man'
      });
    }));
  });
});

@Component({
  selector: 'fiar-host-test-component',
  template: `<fiar-profile-editor
    [user]="user"
    (submit)="onSubmit($event)"
    (cancel)="onCancel()">
  </fiar-profile-editor>`
})
class HostComponent {
  user = { name: '', avatar: 'man'};
  onCancel() {}
  onSubmit(event) {}
}
