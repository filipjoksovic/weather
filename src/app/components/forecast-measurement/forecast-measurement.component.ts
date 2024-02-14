import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { ForecastMeasurement } from '../../models/app/forecast-weather.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-forecast-measurement',
  standalone: true,
  imports: [DateFormatPipe, FaIconComponent],
  templateUrl: './forecast-measurement.component.html',
  styleUrl: './forecast-measurement.component.scss',
})
export class ForecastMeasurementComponent {
  @Input({ required: true }) measurement!: ForecastMeasurement;

  protected readonly faArrowDown = faArrowDown;

  protected readonly faArrowUp = faArrowUp;
}
