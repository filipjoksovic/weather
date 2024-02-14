import { Component, inject } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'app-current-measurement',
  standalone: true,
  imports: [],
  templateUrl: './current-measurement.component.html',
})
export class CurrentMeasurementComponent {
  private readonly weatherService: WeatherService = inject(WeatherService);

  constructor() {
    this.weatherService.getCurrentWeather();
  }
}
