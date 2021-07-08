import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPortalComponent } from './instructor-portal.component';

describe('InstructorPortalComponent', () => {
  let component: InstructorPortalComponent;
  let fixture: ComponentFixture<InstructorPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
