import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { LocationDataComponent } from '../../../components/location-data/location-data.component';
import { CurrentMeasurementComponent } from '../../../components/current-measurement/current-measurement.component';
import { ForecastMeasurementsComponent } from '../../../components/forecast-measurements/forecast-measurements.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    LocationDataComponent,
    CurrentMeasurementComponent,
    ForecastMeasurementsComponent,
  ],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {}
