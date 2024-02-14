import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastMeasurementComponent } from './forecast-measurement.component';

describe('ForecastMeasurementComponent', () => {
  let component: ForecastMeasurementComponent;
  let fixture: ComponentFixture<ForecastMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastMeasurementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
