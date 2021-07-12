import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterErrorComponent } from './alter-error.component';

describe('AlterErrorComponent', () => {
  let component: AlterErrorComponent;
  let fixture: ComponentFixture<AlterErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
