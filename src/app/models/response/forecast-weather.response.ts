import { CoordinatesDataResponse } from './current-weather.response';
import { GeneralWeatherMeasurementsResponse } from './general-weather-measurements.model';
import { SystemDataResponse } from './system-data.response';

export type ForecastWeatherResponse = {
  cod?: string;
  message: number;
  cnt: number;
  list: ForecastWeatherMeasurementResponse[];
  city: {
    id: number;
    name: string;
    coord: CoordinatesDataResponse;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type ForecastWeatherMeasurementResponse = {
  dt?: number;
  pop: number;
  sys: SystemDataResponse;
  dt_txt: string;
} & GeneralWeatherMeasurementsResponse;
