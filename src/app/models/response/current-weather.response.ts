import { GeneralWeatherMeasurementsResponse } from './general-weather-measurements.model';
import { SystemDataResponse } from './system-data.response';

/**
 * This type is NOT to be used accross the application
 *
 * Everything is optional due to data coming from an external source (OpenWeatherMap)
 *
 * For a type used accross the app, see {@link CurrentWeather }
 */
export type CurrentWeatherResponse = {
  base?: string;
  cod?: number;
  dt?: number;
  id?: number;
  timezone?: number;
  name?: string;
  coord?: CoordinatesDataResponse;
  sys?: SystemDataResponse;
} & GeneralWeatherMeasurementsResponse;

export type CoordinatesDataResponse = { lon: number; lat: number };
