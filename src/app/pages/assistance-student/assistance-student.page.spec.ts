import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistanceStudentPage } from './assistance-student.page';

describe('AssistanceStudentPage', () => {
  let component: AssistanceStudentPage;
  let fixture: ComponentFixture<AssistanceStudentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
