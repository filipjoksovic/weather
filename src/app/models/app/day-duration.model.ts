import { SystemDataResponse } from '../response/system-data.response';

export type DayDuration = {
  sunrise: Date;
  sunset: Date;
};

export const systemDataResponseToDayDuration = (
  response: SystemDataResponse | undefined
): DayDuration => ({
  sunrise: response?.sunrise ? new Date(response?.sunrise) : new Date(),
  sunset: response?.sunset ? new Date(response?.sunset) : new Date(),
});
