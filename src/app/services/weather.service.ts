import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, map, of, take, tap } from 'rxjs';
import { CURRENT_RESPONSE } from '../../assets/MOCKS/current-weather-response.mock';
import {
  CurrentWeather,
  currentWeatherResponseToCurrentWeather,
} from '../models/current-weather.model';

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

export const initialLoadableDataState = (): LoadableDataInitial => ({
  state: LoadingState.INITIAL,
});

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly _currentWeather$: BehaviorSubject<
    LoadableData<CurrentWeather>
  > = new BehaviorSubject<LoadableData<CurrentWeather>>(
    initialLoadableDataState()
  );

  public readonly currentWeather$ = this._currentWeather$.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  public getCurrentWeather() {
    this._currentWeather$.next({
      state: LoadingState.LOADING,
    });
    // return this.httpClient
    //   .get(
    //     `https://api.openweathermap.org/data/2.5/weather?lat=${46.55472}&lon=${15.64667}&appid=${environment.openWeatherMapsApiKey}&units=metric`
    //   )
    //   .pipe(
    //     map(currentWeatherResponseToCurrentWeather),
    //     tap({
    //       next: response => {
    //         this._currentWeather$.next({
    //           state: LoadingState.LOADED,
    //           data: response,
    //         });
    //       },
    //       error: err => {
    //         this._currentWeather$.next({
    //           state: LoadingState.ERROR,
    //         });
    //       },
    //     }),
    //     take(1)
    //   )
    //   .subscribe();

    return of(CURRENT_RESPONSE)
      .pipe(
        delay(2000),
        map(currentWeatherResponseToCurrentWeather),
        tap({
          next: response => {
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

  public getForecast() {}
}
