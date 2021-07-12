import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCourseDetailComponent } from './show-course-detail.component';

describe('ShowCourseDetailComponent', () => {
  let component: ShowCourseDetailComponent;
  let fixture: ComponentFixture<ShowCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
