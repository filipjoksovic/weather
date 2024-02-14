import { CurrentWeatherResponse } from '../response/current-weather.response';
import { DayDuration } from './day-duration.model';
import { WeatherConditions } from './weather-conditions.model';
import { WeatherMeasurements } from './weather-measurements.model';
import { WindDetails } from './wind-details.model';

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
    weatherMeasurements: {
      feelsLike: response.main?.feels_like ?? 0,
      humidity: response.main?.humidity ?? 0,
      temperature: response.main?.temp ?? 0,
      temperatureMax: response.main?.temp_max ?? 0,
      temperatureMin: response.main?.temp_min ?? 0,
    },
    dayDuration: {
      sunrise: response.sys?.sunrise
        ? new Date(response.sys.sunrise)
        : new Date(),
      sunset: response.sys?.sunset ? new Date(response.sys.sunset) : new Date(),
    },
    weatherConditions: {
      description:
        (response.weather &&
          response.weather.length > 0 &&
          response.weather[0].description) ||
        'No description',
      name:
        (response.weather &&
          response.weather.length > 0 &&
          response.weather[0].main) ||
        'No weather name',
      icon:
        (response.weather &&
          response.weather.length > 0 &&
          response.weather[0].icon) ||
        'No weather icon',
    },
    wind: {
      speed: response.wind?.speed ?? 0,
      deg: response.wind?.deg ?? 0,
      gust: response.wind?.gust ?? 0,
    },
  };
};
