import { Component, inject } from '@angular/core';
import { LoadingState, WeatherService } from '../../services/weather.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-current-measurement',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    SkeletonComponent,
    FaIconComponent,
    TranslateModule,
  ],
  templateUrl: './current-measurement.component.html',
})
export class CurrentMeasurementComponent {
  private readonly weatherService: WeatherService = inject(WeatherService);

  public currentWeatherState$ = this.weatherService.currentWeather$;
  constructor() {
    this.weatherService.getCurrentWeather();
  }

  protected readonly LoadingState = LoadingState;
  protected readonly faArrowUp = faArrowUp;
  protected readonly faArrowDown = faArrowDown;
}
