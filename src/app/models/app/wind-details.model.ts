import { WindMeasurementResponse } from '../response/wind-measurement.response';

export type WindDetails = {
  speed: number;
  deg: number;
  gust: number;
};

export const windMeasurementResponseToWindDetails = (
  response: WindMeasurementResponse | undefined
): WindDetails => ({
  speed: response?.speed ?? 0,
  deg: response?.deg ?? 0,
  gust: response?.gust ?? 0,
});
