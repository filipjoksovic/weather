import { Component, inject } from '@angular/core';
import { LoadingState, WeatherService } from '../../services/weather.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-current-measurement',
  standalone: true,
  imports: [NgIf, AsyncPipe, SkeletonComponent],
  templateUrl: './current-measurement.component.html',
})
export class CurrentMeasurementComponent {
  private readonly weatherService: WeatherService = inject(WeatherService);

  public currentWeatherState$ = this.weatherService.currentWeather$;
  constructor() {
    this.weatherService.getCurrentWeather();
  }

  protected readonly LoadingState = LoadingState;
}
