import { ForecastMeasurementsComponent } from './forecast-measurements.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from '../../services/weather.service';
import { of } from 'rxjs';
import { forecastWeatherResponseToForecastWeather } from '../../models/app/forecast-weather.model';
import { FORECAST_RESPONSE } from '../../../assets/MOCKS/forecast-weather-response.mock';
import { removeThreeHourIntervals } from '../../helpers/remove-three-hour-intervals';
import { LoadingState } from '../../models/core/loading-state.enum';

function initLoadingComponent(
  spectator: Spectator<ForecastMeasurementsComponent>
) {
  spectator.setInput(
    'currentForecastState$',
    of({
      state: LoadingState.LOADING,
    })
  );

  spectator.detectChanges();
  spectator.detectComponentChanges();
}

function initLoadedComponent(
  spectator: Spectator<ForecastMeasurementsComponent>
) {
  spectator.setInput(
    'currentForecastState$',
    of({
      state: LoadingState.LOADED,
      data: removeThreeHourIntervals(
        forecastWeatherResponseToForecastWeather(FORECAST_RESPONSE)
      ),
    })
  );

  spectator.detectChanges();
  spectator.detectComponentChanges();
}

describe('ForecastMeasurementsComponent', () => {
  let spectator: Spectator<ForecastMeasurementsComponent>;
  const createComponent = createComponentFactory({
    component: ForecastMeasurementsComponent,
    mocks: [WeatherService],
    providers: [],
    imports: [HttpClientTestingModule],
    shallow: false,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('Should define component(smoke)', () => {
    expect(spectator).toExist();
  });

  it('Should render loading skeleton', () => {
    initLoadingComponent(spectator);
    const skeletonContainer = spectator.query(byTestId('skeleton-container'));
    expect(skeletonContainer).toExist();
  });
  it('Should render 6 children in skeleton', () => {
    initLoadingComponent(spectator);
    const skeletons = spectator.queryAll('app-skeleton');
    expect(skeletons.length).toBe(6);
  });

  it('Should render data when loaded', () => {
    initLoadedComponent(spectator);
    const measurements = spectator.queryAll('app-forecast-measurement');
    expect(measurements?.length).toBe(6);
  });
});
