import { CurrentWeatherResponse } from '../../app/models/response/current-weather.response';

export const CURRENT_RESPONSE: CurrentWeatherResponse = {
  coord: { lon: 15.6467, lat: 46.5547 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
  base: 'stations',
  main: {
    temp: 1.82,
    feels_like: 1.82,
    temp_min: 1.82,
    temp_max: 1.82,
    pressure: 1025,
    humidity: 77,
    sea_level: 1025,
    grnd_level: 991,
  },
  visibility: 10000,
  wind: { speed: 1.01, deg: 247, gust: 0.96 },
  clouds: { all: 6 },
  dt: 1707873223,
  sys: {
    type: 2,
    id: 2016229,
    country: 'SI',
    sunrise: 1707890644,
    sunset: 1707927562,
  },
  timezone: 3600,
  id: 3195506,
  name: 'Maribor',
  cod: 200,
};
