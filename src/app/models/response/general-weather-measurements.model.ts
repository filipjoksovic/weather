import { CloudsResponseData } from './clouds-data.response';
import { MainWeatherMeasurementsResponse } from './main-weather-measurement.response';
import { RainDataResponse } from './rain-data.response';
import { SnowDataResponse } from './snow-data.response';
import { WeatherResponseData } from './weather-data.response';
import { WindMeasurementResponse } from './wind-measurement.response';

export type GeneralWeatherMeasurementsResponse = {
  main?: MainWeatherMeasurementsResponse;
  weather?: WeatherResponseData[];
  clouds?: CloudsResponseData;
  wind?: WindMeasurementResponse;
  rain?: RainDataResponse;
  snow?: SnowDataResponse;
  visibility?: number;
};
