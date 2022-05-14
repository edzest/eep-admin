import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestOpenDialogComponent } from './create-test-open-dialog.component';

describe('CreateTestOpenDialogComponent', () => {
  let component: CreateTestOpenDialogComponent;
  let fixture: ComponentFixture<CreateTestOpenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTestOpenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestOpenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
