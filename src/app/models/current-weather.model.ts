import { CurrentWeatherResponse } from './response/current-weather.response';

export type CurrentWeather = {
  name: string;
  weatherMeasurements: {
    feelsLike: number;
    humidity: number;
    temperature: number;
    temperatureMax: number;
    temperatureMin: number;
  };
  dayDuration: {
    sunrise: Date;
    sunset: Date;
  };
  weatherConditions: {
    description: string;
    name: string;
    icon: string;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
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
