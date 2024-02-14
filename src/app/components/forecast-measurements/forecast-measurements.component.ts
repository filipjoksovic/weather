import { Component, inject } from '@angular/core';
import { LoadingState, WeatherService } from '../../services/weather.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ForecastMeasurementComponent } from '../forecast-measurement/forecast-measurement.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-forecast-measurements',
  standalone: true,
  imports: [NgIf, AsyncPipe, ForecastMeasurementComponent, SkeletonComponent],
  templateUrl: './forecast-measurements.component.html',
})
export class ForecastMeasurementsComponent {
  private readonly weatherService: WeatherService = inject(WeatherService);

  public currentForecastState$ = this.weatherService.forecast$;

  constructor() {
    this.weatherService.getForecast();
  }

  protected readonly LoadingState = LoadingState;
}
