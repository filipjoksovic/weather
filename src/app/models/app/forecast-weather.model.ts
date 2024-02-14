import {
  ForecastWeatherMeasurementResponse,
  ForecastWeatherResponse,
} from '../response/forecast-weather.response';
import { DayDuration } from './day-duration.model';
import { weatherResponseToGeneralWeatherMeasurements } from './general-weather-measurements.model';
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
        ...weatherResponseToGeneralWeatherMeasurements(measurement),
      })
    ),
  };
};
