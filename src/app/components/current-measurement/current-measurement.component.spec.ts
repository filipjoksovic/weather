import { CurrentMeasurementComponent } from './current-measurement.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  LoadableData,
  LoadbleDataLoading,
  LoadingState,
  WeatherService,
} from '../../services/weather.service';
import { of } from 'rxjs';
import {
  CurrentWeather,
  currentWeatherResponseToCurrentWeather,
} from '../../models/current-weather.model';
import { CURRENT_RESPONSE } from '../../../assets/MOCKS/current-weather-response.mock';

describe('CurrentMeasurementComponent', () => {
  let spectator: Spectator<CurrentMeasurementComponent>;

  const createComponent = createComponentFactory({
    component: CurrentMeasurementComponent,
    detectChanges: false,
    shallow: false,
    imports: [HttpClientTestingModule],
    providers: [],
    declarations: [],
    mocks: [WeatherService],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('Should define component (smoke)', () => {
    expect(spectator).toBeDefined();
  });

  it('Should display loading state when weather data is loading', () => {
    spectator.setInput(
      'currentWeatherState$',
      of({
        state: LoadingState.LOADING,
      } as LoadbleDataLoading)
    );
    spectator.detectChanges();
    const skeletonContainer = spectator.query(byTestId('loading-container'));
    const skeletonElements = spectator.queryAll('app-skeleton');
    expect(skeletonContainer).toExist();
    expect(skeletonElements.length).toBe(4);
  });

  it('Should display data upon load when data has been loaded', () => {
    spectator.setInput(
      'currentWeatherState$',
      of({
        state: LoadingState.LOADED,
        data: currentWeatherResponseToCurrentWeather(CURRENT_RESPONSE),
      } as LoadableData<CurrentWeather>)
    );
    spectator.detectChanges();
    spectator.detectComponentChanges();

    const dataContainer = spectator.query(byTestId('data-container'));
    const currentTemperature = spectator.query(byTestId('current-temperature'));
    const currentDescription = spectator.query(byTestId('current-description'));
    const currentMinimum = spectator.query(byTestId('current-minimum'));
    const currentMaximum = spectator.query(byTestId('current-maximum'));
    expect(dataContainer).toExist();
    expect(currentDescription).toExist();
    expect(currentTemperature).toExist();
    expect(currentMinimum).toExist();
    expect(currentMaximum).toExist();

    expect(currentMaximum?.querySelector('fa-icon')).toExist();
    expect(currentMaximum).toHaveText('1.82');
    expect(currentMinimum?.querySelector('fa-icon')).toExist();
    expect(currentMinimum).toHaveText('1.82');
    expect(currentTemperature).toHaveText('1.82');
    expect(currentDescription).toHaveText('clear sky');
  });
});
