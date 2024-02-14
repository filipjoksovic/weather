import { Component, Input } from '@angular/core';
import { ForecastMeasurement } from '../../models/app/forecast-weather.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

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
