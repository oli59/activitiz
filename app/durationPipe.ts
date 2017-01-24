// truncate.ts
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'durationPipe'
})
export class DurationPipe implements PipeTransform {
    transform(value: number) : string {
        let hours = Math.floor(value);
        let minutes = value - hours;
        minutes = minutes * 60;
        minutes = Math.round(minutes)

        return hours + 'h ' + minutes + 'm';
    }
}