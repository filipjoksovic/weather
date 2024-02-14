import { CurrentWeatherResponse } from '../response/current-weather.response';
import { ForecastWeatherMeasurementResponse } from '../response/forecast-weather.response';
import {
  DayDuration,
  systemDataResponseToDayDuration,
} from './day-duration.model';
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

export type GeneralWeatherMeasurements = {
  weatherMeasurements: WeatherMeasurements;
  dayDuration: DayDuration;
  weatherConditions: WeatherConditions;
  wind: WindDetails;
};
export const weatherResponseToGeneralWeatherMeasurements = (
  response: CurrentWeatherResponse | ForecastWeatherMeasurementResponse
): GeneralWeatherMeasurements => ({
  weatherMeasurements: weatherMeasurementsResponseToWeatherMeasurements(
    response.main
  ),
  dayDuration: systemDataResponseToDayDuration(response.sys),
  weatherConditions: weatherResponseDataToWeatherConditions(response.weather),
  wind: windMeasurementResponseToWindDetails(response.wind),
});
