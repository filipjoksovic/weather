import { Component, inject } from '@angular/core';
import { combineLatestWith, filter, map, tap } from 'rxjs';
import { LoadingState, WeatherService } from '../../services/weather.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-location-data',
  standalone: true,
  imports: [NgIf, AsyncPipe, DateFormatPipe],
  templateUrl: './location-data.component.html',
  styleUrl: './location-data.component.scss',
})
export class LocationDataComponent {
  private readonly weatherService: WeatherService = inject(WeatherService);

  private readonly currentWeatherLoaded$ =
    this.weatherService.currentWeather$.pipe(
      filter(state => state.state === LoadingState.LOADED)
    );

  private readonly forecastLoaded$ = this.weatherService.forecast$.pipe(
    filter(state => state.state === LoadingState.LOADED)
  );

  dataLoaded$ = this.currentWeatherLoaded$.pipe(
    combineLatestWith(this.forecastLoaded$),
    tap(console.log),
    map(() => new Date())
  );

  reloadData() {}
}
