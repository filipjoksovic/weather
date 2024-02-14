import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LoadingState } from '../../models/core/loading-state.enum';
import { WeatherService } from '../../services/weather.service';
import { ForecastMeasurementComponent } from '../forecast-measurement/forecast-measurement.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-forecast-measurements',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ForecastMeasurementComponent,
    SkeletonComponent,
    TranslateModule,
  ],
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
