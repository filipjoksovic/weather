import { CurrentWeatherResponse } from '../response/current-weather.response';
import {
  GeneralWeatherMeasurements,
  weatherResponseToGeneralWeatherMeasurements,
} from './general-weather-measurements.model';

export type CurrentWeather = {
  name: string;
} & GeneralWeatherMeasurements;

/**
 * Maps a {@link CurrentWeatherResponse} to a usable {@link CurrentWeather} model.
 *
 * To be used only in API services
 */
export const currentWeatherResponseToCurrentWeather = (
  response: CurrentWeatherResponse
): CurrentWeather => {
  return {
    name: response.name ?? '',
    ...weatherResponseToGeneralWeatherMeasurements(response),
  };
};
