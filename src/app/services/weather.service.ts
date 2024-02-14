import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Subject, take, tap } from 'rxjs';
import {
  CurrentWeather,
  currentWeatherResponseToCurrentWeather,
} from '../models/app/current-weather.model';
import {
  ForecastWeather,
  forecastWeatherResponseToForecastWeather,
} from '../models/app/forecast-weather.model';
import { removeThreeHourIntervals } from '../helpers/remove-three-hour-intervals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from './storage.service';
import { StorageKeysEnum } from '../models/core/storage-keys.enum';
import { environment } from '../../environments/environment';
import { ForecastWeatherResponse } from '../models/response/forecast-weather.response';
import { CurrentWeatherResponse } from '../models/response/current-weather.response';
import { TranslateService } from '@ngx-translate/core';

export enum LoadingState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  EMPTY = 'EMPTY',
}

export type LoadableDataInitial = {
  state: LoadingState.INITIAL;
};

export type LoadbleDataLoading = {
  state: LoadingState.LOADING;
};

export type LoadableDataLoaded<T> = {
  state: LoadingState.LOADED;
  data: T;
};

export type LoadableDataError = {
  state: LoadingState.ERROR;
};

export type LoadableDataEmpty = {
  state: LoadingState.EMPTY;
};

export type LoadableData<T> =
  | LoadableDataEmpty
  | LoadableDataError
  | LoadableDataInitial
  | LoadableDataLoaded<T>
  | LoadbleDataLoading;

export enum WeatherReloadAction {
  ALL = 'ALL',
  CURRENT = 'CURRENT',
  FORECAST = 'FORECAST',
}

export const initialLoadableDataState = (): LoadableDataInitial => ({
  state: LoadingState.INITIAL,
});

function exhaustiveTypeCheck(reloadAction: never) {
  console.error(`Provided value ${reloadAction} is not a supported value`);
  return reloadAction;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly _reload$: Subject<WeatherReloadAction> =
    new Subject<WeatherReloadAction>();

  private readonly _currentWeather$: BehaviorSubject<
    LoadableData<CurrentWeather>
  > = new BehaviorSubject<LoadableData<CurrentWeather>>(
    initialLoadableDataState()
  );

  public readonly currentWeather$ = this._currentWeather$.asObservable();

  private readonly _forecast$: BehaviorSubject<LoadableData<ForecastWeather>> =
    new BehaviorSubject<LoadableData<ForecastWeather>>(
      initialLoadableDataState()
    );

  public readonly forecast$ = this._forecast$.asObservable();

  private cached = {
    [StorageKeysEnum.CURRENT_WEATHER]: true,
    [StorageKeysEnum.FORECAST_WEATHER]: true,
  };

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService,
    private readonly translate: TranslateService
  ) {
    this._reload$.pipe(takeUntilDestroyed()).subscribe(reloadAction => {
      switch (reloadAction) {
        case WeatherReloadAction.ALL:
          this.getForecast();
          this.getCurrentWeather();
          break;
        case WeatherReloadAction.FORECAST:
          this.getForecast();
          break;
        case WeatherReloadAction.CURRENT:
          this.getCurrentWeather();
          break;
        default:
          exhaustiveTypeCheck(reloadAction);
          break;
      }
    });

    this.loadCurrentWeatherFromStorage();
    this.loadForecastFromStorage();
  }

  public getCurrentWeather() {
    console.log('called');
    if (!this.cached[StorageKeysEnum.CURRENT_WEATHER]) {
      this._currentWeather$.next({
        state: LoadingState.LOADING,
      });
    } else {
      this.cached[StorageKeysEnum.CURRENT_WEATHER] = false;
    }
    return this.httpClient
      .get<CurrentWeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${46.55472}&lon=${15.64667}&appid=${environment.openWeatherMapsApiKey}&units=metric&lang=${this.translate.currentLang}`
      )
      .pipe(
        map(currentWeatherResponseToCurrentWeather),
        tap({
          next: response => {
            this.storageService.set(StorageKeysEnum.CURRENT_WEATHER, response);
            this._currentWeather$.next({
              state: LoadingState.LOADED,
              data: response,
            });
          },
          error: () => {
            this._currentWeather$.next({
              state: LoadingState.ERROR,
            });
          },
        }),
        take(1)
      )
      .subscribe();
  }

  public getForecast() {
    console.log('getting forecast');
    if (!this.cached[StorageKeysEnum.FORECAST_WEATHER]) {
      this._forecast$.next({
        state: LoadingState.LOADING,
      });
    } else {
      this.cached[StorageKeysEnum.FORECAST_WEATHER] = false;
    }

    return this.httpClient
      .get<ForecastWeatherResponse>(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${46.55472}&lon=${15.64667}&appid=${environment.openWeatherMapsApiKey}&units=metric&lang=${this.translate.currentLang}`
      )
      .pipe(
        map(forecastWeatherResponseToForecastWeather),
        map(removeThreeHourIntervals),
        tap({
          next: response => {
            this.storageService.set(StorageKeysEnum.FORECAST_WEATHER, response);
            this._forecast$.next({
              state: LoadingState.LOADED,
              data: response,
            });
          },
          error: () => {
            this._forecast$.next({
              state: LoadingState.ERROR,
            });
          },
        }),
        take(1)
      )
      .subscribe();
  }

  dispatchReload() {
    this._reload$.next(WeatherReloadAction.ALL);
  }

  private loadCurrentWeatherFromStorage() {
    const currentWeather = this.storageService.get<CurrentWeather>(
      StorageKeysEnum.CURRENT_WEATHER
    );
    if (currentWeather) {
      this._currentWeather$.next({
        state: LoadingState.LOADED,
        data: currentWeather,
      });
      this.cached[StorageKeysEnum.CURRENT_WEATHER] = true;
    }
  }

  private loadForecastFromStorage() {
    const forecast = this.storageService.get<ForecastWeather>(
      StorageKeysEnum.FORECAST_WEATHER
    );
    if (forecast) {
      this._forecast$.next({
        state: LoadingState.LOADED,
        data: forecast,
      });
      this.cached[StorageKeysEnum.FORECAST_WEATHER] = true;
    }
  }
}
