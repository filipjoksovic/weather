import { WeatherResponseData } from '../response/weather-data.response';

export type WeatherConditions = {
  description: string;
  name: string;
  icon: string;
};

export const weatherResponseDataToWeatherConditions = (
  response: WeatherResponseData[] | undefined
): WeatherConditions => ({
  description:
    (response && response.length > 0 && response[0].description) ||
    'No description',
  name:
    (response && response.length > 0 && response[0].main) || 'No weather name',
  icon:
    (response && response.length > 0 && response[0].icon) || 'No weather icon',
});
