import {
  ForecastMeasurement,
  ForecastWeather,
} from '../models/app/forecast-weather.model';

/**
 * Takes in an array of n measurements made in a three-hour interval, and then takes in only first available date.
 *
 *  Since only minimum and maximum temperatures are important, the first available data for that date is good enough
 */
export const removeThreeHourIntervals = (
  weather: ForecastWeather
): ForecastWeather => {
  const filteredMeasurements: ForecastMeasurement[] = [];
  const dates = new Map<number, boolean>();

  weather.measurements.forEach(measurement => {
    const measurementDate = measurement.dateTime.getDate();
    if (!dates.has(measurementDate)) {
      dates.set(measurementDate, true);
      filteredMeasurements.push(measurement);
    }
  });

  return {
    ...weather,
    measurements: [...filteredMeasurements],
  };
};
