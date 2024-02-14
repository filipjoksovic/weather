import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment/moment';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date, format: string = 'DD/MM/YYYY'): unknown {
    return moment(value).format(format);
  }
}
