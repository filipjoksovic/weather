import { MainWeatherMeasurementsResponse } from '../response/main-weather-measurement.response';

export type WeatherMeasurements = {
  feelsLike: number;
  humidity: number;
  temperature: number;
  temperatureMax: number;
  temperatureMin: number;
};

export const weatherMeasurementsResponseToWeatherMeasurements = (
  response: MainWeatherMeasurementsResponse | undefined
) => ({
  feelsLike: response?.feels_like ?? 0,
  humidity: response?.humidity ?? 0,
  temperature: response?.temp ?? 0,
  temperatureMax: response?.temp_max ?? 0,
  temperatureMin: response?.temp_min ?? 0,
});
