/**
 * This type is NOT to be used accross the application
 *
 * Everything is optional due to data coming from an external source (OpenWeatherMap)
 *
 * For a type used accross the app, see {@link CurrentWeather }
 */
export type CurrentWeatherResponse = {
  base?: string;
  clouds?: {
    all?: number;
  };
  cod?: number;
  coord?: { lon: number; lat: number };
  dt?: number;
  id?: number;
  main?: {
    feels_like?: number;
    grnd_level?: number;
    humidity?: number;
    pressure?: number;
    sea_level?: number;
    temp?: number;
    temp_max?: number;
    temp_min?: number;
  };
  sys?: {
    country?: string;
    id?: number;
    sunrise?: number;
    sunset?: number;
    type?: number;
  };
  timezone?: number;
  visibility?: number;
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  name?: string;
};
