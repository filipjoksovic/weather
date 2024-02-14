import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMeasurementComponent } from './current-measurement.component';

describe('CurrentMeasurementComponent', () => {
  let component: CurrentMeasurementComponent;
  let fixture: ComponentFixture<CurrentMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentMeasurementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
