import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns'

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value)
    const currentDate = new Date()

    return formatDistance(currentDate, date);
  }

}
