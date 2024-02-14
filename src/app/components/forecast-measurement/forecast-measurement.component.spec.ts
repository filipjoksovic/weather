import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';

import { ForecastMeasurement } from '../../models/app/forecast-weather.model';
import { ForecastMeasurementComponent } from './forecast-measurement.component';

describe('ForecastMeasurementComponent', () => {
  let spectator: Spectator<ForecastMeasurementComponent>;
  const createComponent = createComponentFactory({
    component: ForecastMeasurementComponent,
    detectChanges: false,
    shallow: false,
    mocks: [],
    providers: [],
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    initComponent(spectator);
  });

  it('Should be defined (smoke)', () => {
    expect(spectator.component).toBeDefined();
  });

  it('Should display a proper weather icon', () => {
    const weatherIcon = spectator.query(byTestId('weather-icon'));
    expect(weatherIcon).toExist();
    expect(weatherIcon).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/test-icon@2x.png'
    );
  });
  it('Should display proper weather description', () => {
    const weatherDescription = spectator.query(byTestId('weather-description'));
    expect(weatherDescription).toExist();
    expect(weatherDescription).toHaveText('Test');
  });
  it('Should display proper maximum temperature', () => {
    const weatherMaxTemperature = spectator.query(byTestId('weather-max-temp'));
    expect(weatherMaxTemperature).toExist();
    expect(weatherMaxTemperature).toHaveText('2');
  });
  it('Should display proper minimum temperature', () => {
    const weatherMinTemperature = spectator.query(byTestId('weather-min-temp'));
    expect(weatherMinTemperature).toExist();
    expect(weatherMinTemperature).toHaveText('3');
  });
});

function initComponent(spectator: Spectator<ForecastMeasurementComponent>) {
  spectator.setInput('measurement', {
    dateTime: new Date(),
    weatherMeasurements: {
      feelsLike: 1,
      humidity: 1,
      temperature: 1,
      temperatureMax: 2,
      temperatureMin: 3,
    },
    dayDuration: {
      sunrise: new Date(),
      sunset: new Date(),
    },
    weatherConditions: {
      description: 'Test description',
      name: 'Test',
      icon: 'test-icon',
    },
    wind: {
      speed: 1,
      deg: 1,
      gust: 1,
    },
  } as ForecastMeasurement);
  spectator.detectChanges();
  spectator.detectComponentChanges();
}
