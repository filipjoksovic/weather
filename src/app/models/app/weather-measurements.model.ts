import { MainWeatherMeasurementsResponse } from '../response/main-weather-measurement.response';

export type WeatherMeasurements = {
  feelsLike: string;
  humidity: string;
  temperature: string;
  temperatureMax: string;
  temperatureMin: string;
};

export const weatherMeasurementsResponseToWeatherMeasurements = (
  response: MainWeatherMeasurementsResponse | undefined
): WeatherMeasurements => ({
  feelsLike: `${response?.feels_like ?? 0} °C`,
  humidity: `${response?.humidity ?? 0} °C`,
  temperature: `${response?.temp ?? 0} °C`,
  temperatureMax: `${response?.temp_max ?? 0} °C`,
  temperatureMin: `${response?.temp_min ?? 0} °C`,
});
