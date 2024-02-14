import { Component, inject } from '@angular/core';
import { filter, map, tap, zip } from 'rxjs';
import { LoadingState, WeatherService } from '../../services/weather.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-location-data',
  standalone: true,
  imports: [NgIf, AsyncPipe, DateFormatPipe, TranslateModule],
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

  dataLoaded$ = zip([this.currentWeatherLoaded$, this.forecastLoaded$]).pipe(
    tap(console.log),
    map(() => new Date())
  );

  reloadData() {
    this.weatherService.dispatchReload();
  }
}
