import { Component, Input } from '@angular/core';
import { GeolocationResponse } from '../../../services/geolocation.service';
import { CurrentMeasurment } from '../../../models/weather-report.model';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss'],
})
export class CityDetailsComponent {
  @Input()
  coordinates: GeolocationResponse | null = null;

  @Input()
  currentWeather!: CurrentMeasurment | undefined;
}
