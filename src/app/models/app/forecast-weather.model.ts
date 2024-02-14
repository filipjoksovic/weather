import {
  ForecastWeatherMeasurementResponse,
  ForecastWeatherResponse,
} from '../response/forecast-weather.response';
import { DayDuration } from './day-duration.model';
import { WeatherConditions } from './weather-conditions.model';
import { WeatherMeasurements } from './weather-measurements.model';
import { WindDetails } from './wind-details.model';

export type ForecastWeather = {
  measurements: ForecastMeasurement[];
};

export type ForecastMeasurement = {
  dateTime: Date;
  weatherMeasurements: WeatherMeasurements;
  dayDuration: DayDuration;
  weatherConditions: WeatherConditions;
  wind: WindDetails;
};

/**
 * Maps a {@link ForecastWeatherResponse} to a usable {@link ForecastWeather} model.
 *
 * To be used only in API services
 */
export const forecastWeatherResponseToForecastWeather = (
  response: ForecastWeatherResponse
): ForecastWeather => {
  return {
    measurements: response.list.map(
      (
        measurement: ForecastWeatherMeasurementResponse
      ): ForecastMeasurement => ({
        dateTime:
          (measurement.dt && new Date(measurement.dt * 1000)) || new Date(),
        weatherMeasurements: {
          feelsLike: measurement.main?.feels_like ?? 0,
          humidity: measurement.main?.humidity ?? 0,
          temperature: measurement.main?.temp ?? 0,
          temperatureMax: measurement.main?.temp_max ?? 0,
          temperatureMin: measurement.main?.temp_min ?? 0,
        },
        dayDuration: {
          sunrise: measurement.sys.sunrise
            ? new Date(measurement.sys.sunrise)
            : new Date(),
          sunset: measurement.sys?.sunset
            ? new Date(measurement.sys.sunset)
            : new Date(),
        },
        weatherConditions: {
          description:
            (measurement.weather &&
              measurement.weather.length > 0 &&
              measurement.weather[0].description) ||
            'No description',
          name:
            (measurement.weather &&
              measurement.weather.length > 0 &&
              measurement.weather[0].main) ||
            'No weather name',
          icon:
            (measurement.weather &&
              measurement.weather.length > 0 &&
              measurement.weather[0].icon) ||
            'No weather icon',
        },
        wind: {
          speed: measurement.wind?.speed ?? 0,
          deg: measurement.wind?.deg ?? 0,
          gust: measurement.wind?.gust ?? 0,
        },
      })
    ),
  };
};
