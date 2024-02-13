import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastMeasurementsComponent } from './forecast-measurements.component';

describe('ForecastMeasurementsComponent', () => {
  let component: ForecastMeasurementsComponent;
  let fixture: ComponentFixture<ForecastMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastMeasurementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
