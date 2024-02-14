import { CurrentWeatherResponse } from '../response/current-weather.response';
import { DayDuration } from './day-duration.model';
import {
  WeatherConditions,
  weatherResponseDataToWeatherConditions,
} from './weather-conditions.model';
import {
  WeatherMeasurements,
  weatherMeasurementsResponseToWeatherMeasurements,
} from './weather-measurements.model';
import {
  WindDetails,
  windMeasurementResponseToWindDetails,
} from './wind-details.model';

export type CurrentWeather = {
  name: string;
  weatherMeasurements: WeatherMeasurements;
  dayDuration: DayDuration;
  weatherConditions: WeatherConditions;
  wind: WindDetails;
};

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
    weatherMeasurements: weatherMeasurementsResponseToWeatherMeasurements(
      response.main
    ),
    dayDuration: {
      sunrise: response.sys?.sunrise
        ? new Date(response.sys.sunrise)
        : new Date(),
      sunset: response.sys?.sunset ? new Date(response.sys.sunset) : new Date(),
    },
    weatherConditions: weatherResponseDataToWeatherConditions(response.weather),
    wind: windMeasurementResponseToWindDetails(response.wind),
  };
};
